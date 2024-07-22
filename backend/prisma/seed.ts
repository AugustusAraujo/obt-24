import prisma from '../src/infra/prisma'
const { hashPassword } = require('../src/services/password')

async function main() {
    console.log('--------------------')
    await criaClubes()
    let password = await hashPassword('12345678')
    for (let i = 1; i < 3; i) {
        await criaUsuarios(i, password)
        await criaProfessores(i)
        await criaTurmas(i)
        await criaAlunos(i)
        await criaAlunosTurmas(i)
        await criaProfessorTurmas(i)
        await criaAdmin(i)
        await criaCertificado(i)
        i++
    }
    console.log('--------------------')
}

async function criaUsuarios(i: number, password: string) {
    return await prisma.usuario
        .create({
            data: {
                usuarioID: i,
                usuarioNome: `Usuario${i}@mail.com`,
                usuarioEmail: `Usuario${i}@mail.com`,
                usuarioSenha: password,
            },
        })
        .then(() => console.log('Criado: Usuário', i))
}

async function criaAlunos(i: number) {
    return await prisma.aluno
        .create({
            data: {
                alunoID: i,
                usuario_ID: i,
            },
        })
        .then(() => console.log('Criado: Aluno', i))
}

async function criaAdmin(i: number) {
    return await prisma.admin
        .create({
            data: {
                adminID: i,
                usuarioID: i,
            },
        })
        .then(() => console.log('Criado: Admin', i))
}

async function criaClubes() {
    return await prisma.clube
        .createMany({
            data: [
                {
                    clubeID: 1,
                    clube_alias: 'Clube1',
                    clube_nome: 'Clube1',
                },
                {
                    clubeID: 2,
                    clube_alias: 'Clube2',
                    clube_nome: 'Clube2',
                },
            ],
            skipDuplicates: true,
        })
        .then(() => console.log('Criado: Clubes'))
        .catch()
}

async function criaProfessores(i: number) {
    return await prisma.professor
        .create({
            data: {
                usuarioID: i,
                professorMateria: 1,
            },
        })
        .then(() => console.log('Criado: Professor', i))
}

async function criaTurmas(i: number) {
    return await prisma.turma.create({
        data: {
            turmaID: i,
            turmaMateria: 1,
            turmaAlunos: [1],
            turmaProfessores: [1],
            turmaConcluida: Math.round(Math.random()) ? true : false,
        },
    })
}

async function criaAlunosTurmas(i: number) {
    return await prisma.alunoTurmas.create({
        data: {
            alunoID: i,
            turmaID: i,
            alunoTurmasID: i,
            usuarioID: i,
        },
    })
}

async function criaProfessorTurmas(i: number) {
    return await prisma.professorTurmas.create({
        data: {
            turmaID: i,
            professorID: i,
            professorTurmasID: i,
        },
    })
}

async function criaCertificado(i: number) {
    return prisma.certificado
        .create({
            data: {
                certificadoTurma: i,
                certificadoAluno: i,
            },
        })
        .then(() => console.log('Criado: Certificados', i))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
