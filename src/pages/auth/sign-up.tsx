
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const signUpForm = z.object({
  email: z.string().email()
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {

  const { register, handleSubmit, formState: {isSubmitting} } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try{
      console.log(data)
      throw new Error()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      //toast.success('Enviamos um link de autenticação para seu email.')
    }catch {
      toast.error('Credenciais inválidas!')
    }
  }
  return (
    <>
      <Helmet title="Cadastro" /> 
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Seu e-mail</Label>
          <Input id="email" type="email" placeholder="Entre com seu email" {...register('email')} />
        </div>
        <Button disabled={isSubmitting} type='submit' className="w-full">Finalizar cadastro</Button>
      </form>
    </>  
  )
}