import passwordService from '../../services/PasswordService'
import usuariosService from '../../services/UsuariosService'
import { CreateNewAccountUseCase } from './CreateNewAccountUseCase'

const createNewAccountUseCase = new CreateNewAccountUseCase(
    usuariosService,
    passwordService,
)

export default createNewAccountUseCase
