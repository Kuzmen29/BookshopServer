export function search(settings) {
    const [
        app, mongoClient,
        NameOfDatabase, SettingsCollection, GeneralCollection] =
        [
            settings.app, settings.mongoClient,
            settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];


    app.get("/BookshopAPI/search", async (request, response) => {

        try {
            const collection = mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            const query = request.query.query;

            let data = await collection.find({ tokens: new RegExp(`${query}`, 'gi') }).toArray();

            let result = {
                success: true,
                status: 200,
                data: data,
            }

            // setTimeout(()=>{
            //     response.status(200).send(result);
            // },20000)

            response.status(200).send(result)

        } catch (error) {
            console.log(error.message);

            let result = {
                success: false,
                status: 500,
                data: [],
                message: "Ошибка при получении настроек словаря."
            }

            response.status(500).send(result);
        }
    });

    app.get("/BookshopAPI/search/letter", async (request, response) => {

        try {
            const collection = mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            const condition = request.query.letter;

            let data = await collection.find({ 'surname_author': new RegExp(`^${condition}`, 'gi') }).toArray();

            let result = {
                success: true,
                status: 200,
                data: data,
                total: data.length
            }
            response.status(200).send(result)

        } catch (error) {
            console.log(error.message);

            let result = {
                success: false,
                status: 500,
                data: [],
                message: "Ошибка при получении настроек словаря."
            }
            response.status(500).send(result);
        }
    });
}