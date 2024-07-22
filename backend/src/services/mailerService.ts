// TODO: REMOVE THIS FILE
import { sendEmailAtivacaoUseCase } from '../useCases/SendEmailAtivacao'
import { sendEmailPasswordResetUseCase } from '../useCases/SendEmailPasswordReset'

export async function emailAtivacao(email: string) {
    return sendEmailAtivacaoUseCase.execute(email)
}

export async function emailRedefinirSenha(
    email: string,
){
    return sendEmailPasswordResetUseCase.execute(email)
}
