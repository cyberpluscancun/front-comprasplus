<script setup>
import { onMounted, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useDocumentEvent } from '@/store/document/useDocumentEvent.js'
import ButtonComponent from '@/commons/ButtonComponent.vue'
import { useAuthStore } from '@/store/auth/useAuthStore.js'
import { useUserStore } from '@/store/user/useUserStore.js'
import { useCostCenterStore } from '@/store/costCenter/useCostCenterStore.js'
import { useDocumentStore } from '@/store/document/useDocumentStore.js'

const documentEvent = useDocumentEvent()
const authStore = useAuthStore()
const documentStore = useDocumentStore()
const userStore = useUserStore()
const costCenterStore = useCostCenterStore()
const costCenters = ref([])
const userID = ref(0)
const user = ref({})
const DocumentDate = ref('')
const isDropDownCostOpen = ref(false)
const selectedCostItem = ref('')
const selectedCostText = ref('Seleccionar')

onMounted(async () => {
  await costCenterStore.loadCostCenters()
  costCenters.value = costCenterStore.costCenters
  console.log(costCenters.value)
  userID.value = await authStore.getUserId()
  await userStore.loadUsers()
  user.value = await userStore.getUserByID(userID.value)
  DocumentDate.value = formatDate(new Date())
})

const originalDocumentValues = ref({
  Title: '',
  CostCenterId: '',
  DepotId: 0,
  DocumentDate: new Date(),
  CreateBy: userID.value,
  CreateOn: new Date()
})

const saveNewDocument = () => {
  const newDocument = {
    Title: originalDocumentValues.value.Title,
    CostCenterId: originalDocumentValues.value.CostCenterId,
    DepotId: originalDocumentValues.value.DepotId,
    DocumentDate: originalDocumentValues.value.DocumentDate,
    CreateBy: userID.value,
    CreateOn: originalDocumentValues.value.CreateOn
  }
  console.log(newDocument)
  documentStore.saveDocument(newDocument)
  documentEvent.isCreatingNewDocument = false
  documentStore.loadDocuments()
}

const closeNewRequest = () => {
  documentEvent.stopCreatingDocument()
  console.log(`desde closeNewReq en modal => ${documentEvent.isCreatingNewDocument}`)
}

const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const toggleDropdownCostCenter = () => {
  isDropDownCostOpen.value = !isDropDownCostOpen.value
}

const selectCost = (item) => {
  selectedCostItem.value = item.name
  console.log(selectedCostItem.value)
  selectedCostText.value = item.name
  originalDocumentValues.value.CostCenterId = item.id
  isDropDownCostOpen.value = false
}
</script>

<template>
  <TransitionRoot as="template" :show="documentEvent.isCreatingNewDocument">
    <Dialog class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-text-color-secondary bg-opacity-50 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                      Crear nuevo documento
                    </DialogTitle>
                    <div class="mt-2">
                      <form>
                        <div class="space-y-12">
                          <div class="border-b border-gray-900/10 pb-12">
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div class="sm:col-span-5">
                                <label
                                  for="first-name"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Título</label
                                >
                                <div class="mt-2">
                                  <input
                                    v-model="originalDocumentValues.Title"
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    autocomplete="given-titulo"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label
                                  for="email"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Fecha</label
                                >
                                <div class="mt-2">
                                  <input
                                    v-model="DocumentDate"
                                    disabled
                                    id="fecha"
                                    name="fecha"
                                    type="date"
                                    autocomplete="fecha"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label
                                  for="usuario"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Usuario</label
                                >
                                <div class="mt-2">
                                  <input
                                    v-model="user.Email"
                                    id="usuario"
                                    name="usuario"
                                    type="text"
                                    autocomplete="usuario"
                                    :disabled="true"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <div id="dropdown-role" class="w-[10rem] mb-3 ml-4">
                                  <label
                                    for="lastNameMaternal"
                                    class="block text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Depot
                                  </label>

                                  <button
                                    id="dropdownHelperRadioButton"
                                    data-dropdown-toggle="dropdownHelperRadio"
                                    class="text-text-white h-[2.3rem] w-full mt-2 bg-gray hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    @click="toggleDropdownCostCenter"
                                  >
                                    {{ selectedCostText }}
                                    <svg
                                      class="w-2.5 h-2.5 ms-2.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 10 6"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                      />
                                    </svg>
                                  </button>

                                  <div
                                    v-if="isDropDownCostOpen"
                                    id="dropdownHelperRadio"
                                    class="absolute z-50 w-48 bg-background rounded-lg shadow dark:bg-gray-700"
                                  >
                                    <ul
                                      class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                      aria-labelledby="dropdownHelperRadioButton"
                                    >
                                      <li v-for="(item, index) in costCenters" :key="index">
                                        <div
                                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                                          @click="selectCost(item)"
                                        >
                                          <input
                                            :id="'radio-item-' + index"
                                            name="helper-radio"
                                            type="radio"
                                            :value="item"
                                            v-model="selectedCostItem"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          />
                                          <label
                                            :for="'radio-item-' + index"
                                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                            >{{ item.name }}</label
                                          >
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <div id="dropdown-role" class="w-[10rem] mb-3 ml-4">
                                  <label
                                    for="lastNameMaternal"
                                    class="block text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Cost Centers
                                  </label>

                                  <button
                                    id="dropdownHelperRadioButton"
                                    data-dropdown-toggle="dropdownHelperRadio"
                                    class="text-text-white h-[2.3rem] w-full mt-2 bg-gray hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    @click="toggleDropdownCostCenter"
                                  >
                                    {{ selectedCostText }}
                                    <svg
                                      class="w-2.5 h-2.5 ms-2.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 10 6"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                      />
                                    </svg>
                                  </button>

                                  <div
                                    v-if="isDropDownCostOpen"
                                    id="dropdownHelperRadio"
                                    class="absolute z-50 w-48 bg-background rounded-lg shadow dark:bg-gray-700"
                                  >
                                    <ul
                                      class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                      aria-labelledby="dropdownHelperRadioButton"
                                    >
                                      <li v-for="(item, index) in costCenters" :key="index">
                                        <div
                                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                                          @click="selectCost(item)"
                                        >
                                          <input
                                            :id="'radio-item-' + index"
                                            name="helper-radio"
                                            type="radio"
                                            :value="item"
                                            v-model="selectedCostItem"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          />
                                          <label
                                            :for="'radio-item-' + index"
                                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                            >{{ item.name }}</label
                                          >
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-6 flex items-center justify-end gap-x-6">
                          <ButtonComponent
                            @click="closeNewRequest"
                            custom-class="hover:bg-error"
                            type="button"
                            label="Cancelar"
                          />
                          <ButtonComponent
                            custom-class="hover:bg-primary"
                            type="button"
                            label="Guardar"
                            @click="saveNewDocument"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
