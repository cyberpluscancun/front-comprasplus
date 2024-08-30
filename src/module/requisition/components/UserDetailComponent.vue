<script setup>
import { onMounted, ref, watch } from 'vue'
import InputComponent from '@/commons/InputComponent.vue'
import ButtonComponent from '@/commons/ButtonComponent.vue'
import { useRoute } from 'vue-router'
import { fetchUsers, findUserById } from '@/services/user-services.js'
import { useUserStore } from '@/store/newUser.js'

const route = useRoute()
const userId = ref(route.params.id)
const userStore = useUserStore()
let isEdit = ref(false)
let tempOriginalValues = ref({})
let blankValues = ref({})

const originalValues = ref({
  userId: userId.value,
  firstName: '',
  lastNamePaternal: '',
  lastNameMaternal: '',
  password: '',
  repeatPassword: '',
  fileInput: ''
})

let users = ref([])

onMounted(async () => {
  await loadUsers()
  fetchUserById(userId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    userId.value = newId
    fetchUserById(newId)
  }
)

watch(
  () => userStore.isCreatingNewUser,
  (isCreating) => {
    if (isCreating) {
      // Limpiar inputs y activar modo de edición
      resetForm()
      userStore.stopCreatingUser()
    }
  }
)

const loadUsers = async () => {
  users.value = await fetchUsers()
}

const fetchUserById = (id) => {
  const user = findUserById(users.value, id)
  if (user) {
    originalValues.value = { ...user }
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
}

function resetForm() {
  isEdit.value = true
  originalValues.value = { ...blankValues }
}

function saveUser() {
  const savedUser = {
    id: originalValues.value.userId,
    firstName: originalValues.value.firstName,
    lastNamePaternal: originalValues.value.lastNamePaternal,
    lastNameMaternal: originalValues.value.lastNameMaternal,
    password: originalValues.value.password,
    repeatPassword: originalValues.value.repeatPassword,
    fileInput: originalValues.value.fileInput
  }

  console.log('Guardando usuario:', savedUser)

  isEdit.value = false
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
            v-model="originalValues.firstName"
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
              v-model="originalValues.lastNamePaternal"
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
              v-model="originalValues.lastNameMaternal"
              id="lastNameMaternal"
              type="text"
              required
              placeholder="Apellido Materno..."
              customClass="h-[2rem]"
              :disabled="!isEdit"
            />
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
