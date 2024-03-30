
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurant"
import { useNavigate } from "react-router-dom"

const signUpForm = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: {isSubmitting} } = useForm<SignUpForm>()
 
  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant
  })

  async function handleSignUp(data: SignUpForm) {
    try{
      console.log(data)
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone
      })
      toast.success('Restaurante cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`)
        }
      })
    }catch {
      toast.error('Erro ao cadastrar restaurante.')
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
          <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
          <Input id="restaurantName" type="restaurantName" placeholder="Entre com o nome do restaurante" {...register('restaurantName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="managerName">Seu nome</Label>
          <Input id="managerName" type="managerName" placeholder="Digite seu nome" {...register('managerName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Seu email</Label>
          <Input id="email" type="email" placeholder="Entre com seu email" {...register('email')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Celular</Label>
          <Input id="phone" type="phone" placeholder="Entre com seu nº de celular" {...register('phone')} />
        </div>
        <Button disabled={isSubmitting} type='submit' className="w-full">
          Finalizar cadastro
        </Button>

        <p className="px-6 text-center text-sm leadind-relaxed text-muted-foreground">
          Ao continuar, você concorda com nossos <a className="underline underline-offset-4" href="">termos de serviço</a> e {' '}
            <a className="underline underline-offset-4" href="">políticas de privacidade</a>.
        </p>
      </form>
    </>  
  )
}