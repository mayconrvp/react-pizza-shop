import { api } from "@/lib/axios";

interface UpdateProfileBody {
  name: string
  description: string | null 
}

export async function updateProfile({ name, description }: UpdateProfileBody) {

  await api.put('/profile', { name, description })
  // await new Promise((resolve, reject) => {
  //   //throw new Error()
  //   setTimeout(reject, 3000)
  // })
}