export class IBusinessModel {

    constructor(
        public id?: number | undefined,
        public name?: string | undefined,
        public business?: string,
        public valuation?: number,
        public active?: boolean,
        public cep?: string,
        public cnpj?: number,
    ) {}

}
