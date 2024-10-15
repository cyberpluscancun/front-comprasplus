<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import InputComponent from '@/commons/InputComponent.vue'
import ButtonComponent from '@/commons/ButtonComponent.vue'
import { useRoute } from 'vue-router'
import { useUserEvent } from '@/store/user/useUserEvent.js'
import { useUserStore } from '@/store/user/useUserStore.js'
import { roleItems } from '@/module/auth/composable/roles.js'
import { useDocumentItemStore } from '@/store/document-item/useDocumentItemStore.js'
import { useAuthStore } from '@/store/auth/useAuthStore'

const route = useRoute()
const paramsId = ref(route.params.id)
const userLoginId = ref(0)
const currentDate = ref('')
const userEvent = useUserEvent()
const userStore = useUserStore()
const authStore = useAuthStore()
const isEdit = ref(false)
const isChecked1 = ref(false)
const isChecked2 = ref(false)
const isDropDownRoleOpen = ref(false)
const selectedRoleItem = ref('')
const selectedRoleText = ref('Seleccionar')
const userRoleItems = roleItems
let tempOriginalValues = ref({})
const isNewUser = ref(false)

let blankValues = {
  UserId: '',
  Email: '',
  Name: '',
  Password: '',
  LastNameFather: '',
  LastNameMother: '',
  Picture: '',
  Auth1: false,
  Auth2: false,
  CostCenter: '',
  CspDepotId: '',
  Disable: false,
  Role: ''
}

const originalUserValues = ref({
  UserId: paramsId.value,
  Email: '',
  Name: '',
  Password: '',
  LastNameFather: '',
  LastNameMother: '',
  Picture: '',
  Auth1: false,
  Auth2: false,
  CostCenter: '',
  CspDepotId: '',
  Disable: false,
  Role: ''
})

const formValues = computed(() => {
  return isEdit.value ? originalUserValues.value : blankValues
})

onMounted(async () => {
  await userStore.loadUsers()
  await fetchUserById(paramsId.value)
  userLoginId.value = await authStore.getUserId()
  currentDate.value = new Date().toISOString()
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
      console.log('Creando nuevo usuario, restableciendo formulario...')
      resetForm()
      isNewUser.value = true
      userEvent.stopCreatingUser()
    }
  }
)

watch(isEdit, (newValue) => {
  if (!newValue) {
    originalUserValues.value = { ...blankValues }
  }
})

const fetchUserById = async (id) => {
  const user = await userStore.getUserByID(id)
  if (user) {
    console.log(`Este es el user -> ${user}`)
    originalUserValues.value = { ...user }
    isChecked1.value = !!user.Auth1
    isChecked2.value = !!user.Auth2
    selectedRoleItem.value = user.Role
    selectedRoleText.value = user.Role
  } else {
    console.warn(`Usuario con ID ${id} no encontrado`)
  }
  console.log(originalUserValues.value)
  return user
}

function alternateEdit() {
  isEdit.value = true
  tempOriginalValues.value = { ...originalUserValues.value }
}

function cancelEdit() {
  isEdit.value = false
  originalUserValues.value = { ...tempOriginalValues.value }
  selectedRoleText.value = 'Seleccionar'
}

function resetForm() {
  isEdit.value = true
  originalUserValues.value = { ...blankValues } // Asegúrate de hacer una copia
  console.log(originalUserValues.value) // Verifica que todos los campos se hayan actualizado
  isChecked1.value = false
  isChecked2.value = false
  selectedRoleItem.value = ''
  selectedRoleText.value = 'Seleccionar' // Resetear el texto del rol
}

const saveUser = async () => {
  const savedUser = {
    Email: originalUserValues.value.Email,
    Name: originalUserValues.value.Name,
    Password: String(originalUserValues.value.Password),
    LastNameFather: originalUserValues.value.LastNameFather,
    LastNameMother: originalUserValues.value.LastNameMother,
    Picture: originalUserValues.value.Picture,
    Auth1: isChecked1.value,
    Auth2: isChecked2.value,
    CostCenter: Number(originalUserValues.value.CostCenter),
    CspDepotId: Number(originalUserValues.value.CspDepotId),
    Disable: originalUserValues.value.Disable,
    Role: selectedRoleItem.value,
    CspUserId: 1,
    CreateBy: userLoginId.value,
    CreateOn: currentDate.value
  }

  if (isNewUser.value) {
    await userStore.saveNewUser(savedUser)
    await userStore.users.push(savedUser)
    console.log('Nuevo usuario guardado:', savedUser)
  } else {
    let userId = Number(paramsId.value)
    savedUser.UserId = userId
    await userStore.updateUser(userId, savedUser)
    console.log('Usuario actualizado:', savedUser)
  }
  await userStore.loadUsers()
  isEdit.value = false
  isNewUser.value = false // Restablece el estado después de guardar
  resetForm()
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
  <div class="grid grid-cols-1 gap-2 p-4 md:p-6">
    <div class="h-auto rounded-lg p-4 bg-card">
      <form class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-900"> Nombres </label>
          <InputComponent
            v-model="originalUserValues.Name"
            id="firstName"
            type="text"
            required
            placeholder="Nombres..."
            customClass="h-10 w-full md:w-1/2"
            :disabled="!isEdit"
          />
        </div>
        <div class="flex flex-col md:flex-row md:space-x-4">
          <div>
            <label for="lastNamePaternal" class="block text-sm font-medium text-gray-900">
              Apellido Paterno
            </label>
            <InputComponent
              v-model="originalUserValues.LastNameFather"
              id="lastNamePaternal"
              type="text"
              required
              placeholder="Apellido Paterno..."
              customClass="h-10"
              :disabled="!isEdit"
            />
          </div>
          <div>
            <label for="lastNameMaternal" class="block text-sm font-medium text-gray-900">
              Apellido Materno
            </label>
            <InputComponent
              v-model="originalUserValues.LastNameMother"
              id="lastNameMaternal"
              type="text"
              required
              placeholder="Apellido Materno..."
              customClass="h-10"
              :disabled="!isEdit"
            />
          </div>
          <div id="dropdown-role" class="mb-3">
            <label for="role" class="block text-sm font-medium text-gray-900"> Roles </label>
            <button
              class="w-full h-10 mt-2 bg-gray hover:bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center"
              type="button"
              :disabled="!isEdit"
              @click="toggleDropdownRole"
            >
              {{ selectedRoleText }}
            </button>
            <!-- Menú desplegable -->
            <div
              v-if="isDropDownRoleOpen"
              class="absolute z-50 w-full bg-background rounded-lg shadow"
            >
              <ul class="p-3 space-y-1 text-sm text-gray-700">
                <li v-for="(item, index) in userRoleItems" :key="index">
                  <div
                    class="flex items-center p-2 rounded hover:bg-gray-100"
                    @click="selectRole(item)"
                  >
                    <input
                      :id="'radio-item-' + index"
                      name="helper-radio"
                      type="radio"
                      :value="item"
                      v-model="selectedRoleItem"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label :for="'radio-item-' + index" class="ml-2 text-sm">{{ item }}</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-900"> Email </label>
          <InputComponent
            v-model="originalUserValues.Email"
            id="email"
            type="email"
            required
            placeholder="Email..."
            customClass="h-10 w-full md:w-1/2"
            :disabled="!isEdit"
          />
        </div>

        <div class="flex flex-col md:flex-row md:space-x-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <InputComponent
              v-model="originalUserValues.Password"
              id="password"
              type="password"
              required
              placeholder="Contraseña..."
              customClass="h-10"
              :disabled="!isEdit"
            />
          </div>
          <div>
            <label for="repeatPassword" class="block text-sm font-medium text-gray-900">
              Repetir contraseña
            </label>
            <InputComponent
              v-model="originalUserValues.repeatPassword"
              id="repeatPassword"
              type="password"
              required
              placeholder="Contraseña..."
              customClass="h-10"
              :disabled="!isEdit"
            />
          </div>
        </div>

        <div>
          <label for="fileInput" class="block text-sm font-medium text-gray-900">
            Foto de perfil
          </label>
          <InputComponent
            id="fileInput"
            type="file"
            custom-class="bg-gray-50 w-full cursor-pointer"
            :disabled="!isEdit"
          />
        </div>

        <div class="flex justify-end">
          <div v-if="!isEdit">
            <ButtonComponent
              type="button"
              label="Editar"
              custom-class="hover:bg-primary"
              @click="alternateEdit"
            />
          </div>
          <div v-else class="flex space-x-4">
            <ButtonComponent
              type="button"
              label="Guardar"
              custom-class="hover:bg-primary"
              @click="saveUser"
            />
            <ButtonComponent
              type="button"
              label="Cancelar"
              custom-class="hover:bg-error"
              @click="cancelEdit"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
