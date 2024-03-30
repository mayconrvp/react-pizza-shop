
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Link, useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/sign-in"

const signInForm = z.object({
  email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { 
    register, 
    handleSubmit, 
    formState: {isSubmitting} 
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  })

  //mutação é qualquer ação que não é uma ação de retorno
  //mutateAsync => função que vai disparar a função de autenticação
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  })

  async function handleSignIn(data: SignInForm) {
    try{
      console.log(data)
      await authenticate({ email: data.email })
      toast.success('Enviamos um link de autenticação para seu email.')
    }catch {
      toast.error('Credenciais inválidas!')
    }
  }
  return (
    <>
      <Helmet title="Login" /> 
      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-up" className="">
            Novo estabelecimento
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
            <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Seu e-mail</Label>
          <Input id="email" type="email" placeholder="Entre com seu email" {...register('email')} />
        </div>
        <Button disabled={isSubmitting} type='submit' className="w-full">Acessar Painel</Button>
      </form>
    </>  
  )
}