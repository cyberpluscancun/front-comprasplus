<script setup>
import { onMounted, ref, watch } from 'vue'
import InputComponent from '@/commons/InputComponent.vue'
import ButtonComponent from '@/commons/ButtonComponent.vue'
import { useRoute } from 'vue-router'
import { useUserEvent } from '@/store/user/useUserEvent.js'
import { useUserStore } from '@/store/user/useUserStore.js'
import { roleItems } from '@/module/auth/composable/roles.js'

const route = useRoute()
const paramsId = ref(route.params.id)
const userEvent = useUserEvent()
const userStore = useUserStore()
const isEdit = ref(false)
const isChecked1 = ref(false)
const isChecked2 = ref(false)
let tempOriginalValues = ref({})
let blankValues = ref({})
const isDropDownRoleOpen = ref(false)
const selectedRoleItem = ref('')
const selectedRoleText = ref('Seleccionar')
const userRoleItems = roleItems

const originalValues = ref({
  UserId: paramsId.value,
  email: '',
  name: '',
  lastnamefather: '',
  lastnamemother: '',
  Picture: '',
  Auth1: false,
  Auth2: false,
  CostCenter: '',
  CspDepotId: '',
  Disable: false,
  Role: ''
})

onMounted(async () => {
  await userStore.loadUsers()
  fetchUserById(paramsId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    paramsId.value = newId
    fetchUserById(newId)
  }
)

watch(
  () => userEvent.isCreatingNewUser,
  (isCreating) => {
    if (isCreating) {
      // Limpiar inputs y activar modo de edición
      resetForm()
      userEvent.stopCreatingUser()
    }
  }
)

const fetchUserById = (id) => {
  const user = userStore.getUserByID(id)
  if (user) {
    console.log(`Este es el user -> ${user}`)
    originalValues.value = { ...user }
    isChecked1.value = !!user.Auth1
    isChecked2.value = !!user.Auth2
    selectedRoleItem.value = user.Role
    selectedRoleText.value = user.Role
  } else {
    console.warn(`Usuario con ID ${id} no encontrado`)
  }
  console.log(originalValues.value)
  return user
}

function alternateEdit() {
  isEdit.value = true
  tempOriginalValues.value = { ...originalValues.value }
}

function cancelEdit() {
  isEdit.value = false
  originalValues.value = { ...tempOriginalValues.value }
  selectedRoleText.value = 'Seleccionar'
}

function resetForm() {
  isEdit.value = true
  originalValues.value = { ...blankValues }
  isChecked1.value = false
  isChecked2.value = false
  selectedRoleItem.value = ''
}

function saveUser() {
  const savedUser = {
    UserId: originalValues.value.UserId,
    email: originalValues.value.email,
    name: originalValues.value.name,
    lastnamefather: originalValues.value.lastnamefather,
    lastnamemother: originalValues.value.lastnamemother,
    Picture: originalValues.value.Picture,
    Auth1: isChecked1.value,
    Auth2: isChecked2.value,
    CostCenter: originalValues.value.CostCenter,
    CspDepotId: originalValues.value.CspDepotId,
    Disable: originalValues.value.Disable,
    Role: selectedRoleItem.value
  }

  console.log('Guardando usuario:', savedUser)

  isEdit.value = false
}

function toggleDropdownRole() {
  isDropDownRoleOpen.value = !isDropDownRoleOpen.value
}

function selectRole(item) {
  selectedRoleItem.value = item
  selectedRoleText.value = item
  isDropDownRoleOpen.value = false
}
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <div class="h-auto rounded-lg p-2 bg-card">
      <form class="p-3">
        <div class="mb-2">
          <label
            for="firstName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombres
          </label>
          <InputComponent
            v-model="originalValues.name"
            id="firstName"
            type="text"
            required
            placeholder="Nombres..."
            customClass="h-[2rem] w-[50%]"
            :disabled="!isEdit"
          />
        </div>
        <div class="flex">
          <div class="mb-2">
            <label
              for="lastNamePaternal"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellido Paterno
            </label>
            <InputComponent
              v-model="originalValues.lastnamefather"
              id="lastNamePaternal"
              type="text"
              required
              placeholder="Apellido Paterno..."
              customClass="h-[2rem]"
              :disabled="!isEdit"
            />
          </div>
          <div class="ml-4 mb-2">
            <label
              for="lastNameMaternal"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellido Materno
            </label>
            <InputComponent
              v-model="originalValues.lastnamemother"
              id="lastNameMaternal"
              type="text"
              required
              placeholder="Apellido Materno..."
              customClass="h-[2rem]"
              :disabled="!isEdit"
            />
          </div>
          <div id="dropdown-role" class="w-[10rem] mb-3 ml-4">
            <label
              for="lastNameMaternal"
              class="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Roles
            </label>

            <button
              id="dropdownHelperRadioButton"
              data-dropdown-toggle="dropdownHelperRadio"
              class="text-text-white h-[2rem] mt-2 bg-gray hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              :disabled="!isEdit"
              @click="toggleDropdownRole"
            >
              {{ selectedRoleText }}
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

            <!-- Menú desplegable -->
            <div
              v-if="isDropDownRoleOpen"
              id="dropdownHelperRadio"
              class="absolute z-50 w-48 bg-background rounded-lg shadow dark:bg-gray-700"
            >
              <ul
                class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHelperRadioButton"
              >
                <li v-for="(item, index) in userRoleItems" :key="index">
                  <div
                    class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                    @click="selectRole(item)"
                  >
                    <input
                      :id="'radio-item-' + index"
                      name="helper-radio"
                      type="radio"
                      :value="item"
                      v-model="selectedRoleItem"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      :for="'radio-item-' + index"
                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >{{ item }}</label
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div id="checkbox-auths" class="mb-3 ml-5 px-4">
            <label
              for="lastNameMaternal"
              class="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Autorizaciones
            </label>

            <div class="mt-1">
              <div class="flex items-center mb-4">
                <input
                  :checked="isChecked1"
                  id="checkbox-1"
                  type="checkbox"
                  :disabled="!isEdit"
                  @change="isChecked1 = !isChecked1"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Autorización 1</label
                >
              </div>
              <div class="flex items-center">
                <input
                  :checked="isChecked2"
                  id="checkbox-2"
                  type="checkbox"
                  :disabled="!isEdit"
                  @change="isChecked2 = !isChecked2"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="checked-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Autorización 2</label
                >
              </div>
            </div>

            <!--            <button-->
            <!--              id="dropdownCheckboxButton"-->
            <!--              data-dropdown-toggle="dropdownDefaultCheckbox"-->
            <!--              class="text-text-white mt-2 bg-gray hover:bg-primary h-[2rem] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"-->
            <!--              type="button"-->
            <!--              @click="toggleDropdownAuth"-->
            <!--            >-->
            <!--              Seleccionar-->
            <!--              <svg-->
            <!--                class="w-2.5 h-2.5 ms-3"-->
            <!--                aria-hidden="true"-->
            <!--                xmlns="http://www.w3.org/2000/svg"-->
            <!--                fill="none"-->
            <!--                viewBox="0 0 10 6"-->
            <!--              >-->
            <!--                <path-->
            <!--                  stroke="currentColor"-->
            <!--                  stroke-linecap="round"-->
            <!--                  stroke-linejoin="round"-->
            <!--                  stroke-width="2"-->
            <!--                  d="m1 1 4 4 4-4"-->
            <!--                />-->
            <!--              </svg>-->
            <!--            </button>-->

            <!--            &lt;!&ndash; Dropdown menu &ndash;&gt;-->
            <!--            <div-->
            <!--              v-if="isDropDownAuthOpen"-->
            <!--              id="dropdownDefaultCheckbox"-->
            <!--              class="absolute z-50 w-48 bg-background rounded-lg shadow dark:bg-gray-700"-->
            <!--            >-->
            <!--              <ul-->
            <!--                class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"-->
            <!--                aria-labelledby="dropdownBgHoverButton"-->
            <!--              >-->
            <!--                <li v-for="(item, index) in authItems" :key="index">-->
            <!--                  <div-->
            <!--                    class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"-->
            <!--                  >-->
            <!--                    <input-->
            <!--                      :id="'checkbox-item-' + index"-->
            <!--                      type="checkbox"-->
            <!--                      :value="item"-->
            <!--                      v-model="selectedAuthItem"-->
            <!--                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"-->
            <!--                    />-->
            <!--                    <label-->
            <!--                      :for="'checkbox-item-' + index"-->
            <!--                      class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"-->
            <!--                      >{{ item }}</label-->
            <!--                    >-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="flex">
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <InputComponent
              v-model="originalValues.password"
              id="password"
              type="password"
              required
              placeholder="Contraseña..."
              customClass="h-[2rem] w-[16rem]"
              :disabled="!isEdit"
            />
          </div>
          <div class="ml-4 mb-5">
            <label
              for="repeatPassword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repetir contraseña
            </label>
            <InputComponent
              v-model="originalValues.repeatPassword"
              id="repeatPassword"
              type="password"
              required
              placeholder="Contraseña..."
              customClass="w-[16rem]"
              :disabled="!isEdit"
            />
          </div>
        </div>

        <div class="mb-5">
          <label
            for="fileInput"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Foto de perfil
          </label>
          <InputComponent
            id="fileInput"
            type="file"
            custom-class="p-[0.1rem] bg-background w-[50%] text-gray-900 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
            :disabled="!isEdit"
          />
        </div>
        <div class="grid place-items-end">
          <div v-if="!isEdit">
            <div>
              <ButtonComponent
                type="button"
                icon="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                label="Editar"
                custom-class="hover:bg-primary"
                @click="alternateEdit"
              />
            </div>
          </div>
          <div v-else class="flex">
            <div>
              <ButtonComponent
                type="submit"
                icon="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                label="Guardar"
                custom-class="hover:bg-primary"
                @click="saveUser"
              />
            </div>

            <div class="ml-4">
              <ButtonComponent
                type="button"
                icon="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                label="Cancelar"
                custom-class="hover:bg-error"
                @click="cancelEdit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
