
export class DataService {
    async saveData(Data: any): Promise<number> {
        return Math.floor(Math.random() * (30 - 5) + 5);
    }
}