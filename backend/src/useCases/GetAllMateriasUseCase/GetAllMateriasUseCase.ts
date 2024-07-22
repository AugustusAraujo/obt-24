import materiasService from "../../services/MateriasService";

export class GetAllMateriasUseCase {
  async execute() {
    try {
      return await materiasService
        .findAllMaterias()
        .then((r) => r)
        .catch(() => new Error("Não foi possível encontrar as matérias."));
    } catch (e) {
      throw e;
    }
  }
}