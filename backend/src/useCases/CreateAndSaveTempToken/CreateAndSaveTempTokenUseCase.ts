import {
    checkIfTokenExists,
    createTempTokenFromEmail,
    saveToken,
} from '../../services/tokens'

export class CreateAndSaveTempTokenUseCase {
    async execute(email: string, type: string): Promise<string> {
        let token = createTempTokenFromEmail(email)

        const exists = await checkIfTokenExists(token, type)

        if (exists) {
            return token
        }

        return await saveToken(token, type).then(() => {
            return token
        })
    }
}
