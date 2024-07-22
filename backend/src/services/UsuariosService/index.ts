import prisma from '../../infra/prisma'
import { UsuariosService } from './UsuariosService'

const usuariosService = new UsuariosService(prisma)

export default usuariosService
