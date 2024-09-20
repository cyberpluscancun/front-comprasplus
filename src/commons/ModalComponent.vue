<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useDocumentEvent } from '@/store/document/useDocumentEvent.js'
import ButtonComponent from '@/commons/ButtonComponent.vue'
import { useAuthStore } from '@/store/auth/useAuthStore.js'

const documentEvent = useDocumentEvent()
const authStore = useAuthStore()
const userID = ref(0)
const DocumentDate = ref('')

onMounted(async () => {
  userID.value = await authStore.getUserId()
  console.log(userID.value)
  DocumentDate.value = formatDate(new Date())
})

const originalDocumentValues = ref({
  Title: '',
  CostCenterId: 0,
  DepotId: '',
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
    CreateBy: originalDocumentValues.value.CreateBy,
    CreateOn: originalDocumentValues.value.CreateOn
  }

  console.log(newDocument)
  documentEvent.isCreatingNewDocument = false
}

function closeNewRequest() {
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
                                    id="usuario"
                                    name="usuario"
                                    type="text"
                                    autocomplete="usuario"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
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
