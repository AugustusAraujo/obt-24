import prisma from '../infra/prisma'

const { decodeToken } = require('./tokens')

async function countAlunoCertificados(
    usuarioID: number,
): Promise<number | Error | any> {
    return await prisma.certificado
        .count({
            where: {
                CertificadoAluno: {
                    every: {
                        Alunos: {
                            usuario_ID: usuarioID
                        }
                    }
                },
            certificadoTipo: "PCC"
            },
        })
        .then((count: number) => count)
        .catch(() => new Error('Não foi possível buscar certificados.'))
}

async function getAlunoCertificados(usuarioID: number, turmaID: number) {
    if (!usuarioID) throw new Error('Faltando parâmetros.')
    return prisma.certificado
        .findMany({
            where: {
                CertificadoAluno: {
                    every: {
                        Alunos: {
                            Usuarios: {
                                usuarioID: usuarioID
                            }
                        }
                    }
                },
            certificadoTurma: turmaID,
            },
            select: {
                certificadoUUID: true,
                certificadoTipo: true,
                certificadoTurma: true,
                createdAt: true,
                CertificadoAluno: {
                    select: {
                        Alunos: {
                            select: {
                                Usuarios: {
                                    select: {
                                        usuarioNome: true,
                                    },
                                },
                            },
                        },
                    },
                },
                CertificadoTurma: {
                    select: {
                        Materia: {
                            select: {
                                clube_nome: true,
                                clube_alias: true,
                            },
                        },
                    },
                },
            },
        })
        .then((certificados) =>
            certificados.map((i) => {
                return {
                    certificadoUUID: i.certificadoUUID,
                    certificadoTipo: i.certificadoTipo,
                    certificadoTurma: i.certificadoTurma,
                    alunoNome:
                        i.CertificadoAluno[0].Alunos.Usuarios?.usuarioNome,
                    certificadoMateria: i.CertificadoTurma.Materia,
                    createdAt: i.createdAt,
                }
            }),
        )
        .catch(() => new Error('Não foi possível buscar certificados.'))
}

async function novoCertificado(
    usuarioID: number,
    turmaID: number,
    certificadoTipo: string,
) {
    if (!usuarioID && !turmaID && !certificadoTipo) {
        throw new Error('Faltando parâmetros.')
    }
    // @ts-ignore
    const alunoID = await prisma.aluno
        .findUnique({
            where: {
                usuario_ID: usuarioID,
            },
        })
        // @ts-ignore
        .then((r) => r.alunoID)

    return await prisma.certificado
        .create({
            data: {
                certificadoAluno: alunoID,
                certificadoTurma: turmaID,
                certificadoTipo: certificadoTipo,
                CertificadoAluno: {
                    create: {
                        alunoID: alunoID,
                    },
                },
            },
        })
        .then(
            (certificado: {
                certificadoUUID: any
                certificadoTurma: any
                certificadoAluno: any
            }) => {
                return {
                    uuid: certificado.certificadoUUID,
                    certificadoTurma: certificado.certificadoTurma,
                    certificadoAluno: certificado.certificadoAluno,
                }
            },
        )
        .catch((e: Error) => e)
}

module.exports = Object.freeze({
    novoCertificado,
    countAlunoCertificados,
    getAlunoCertificados,
})
