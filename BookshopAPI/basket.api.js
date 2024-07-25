export function basket(settings) {

    const [
        app, mongoClient,
        NameOfDatabase, SettingsCollection, GeneralCollection] =
        [
            settings.app, settings.mongoClient,
            settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

    app.post("/BookshopAPI/basket", async (request, response) => {

        try {
            const collection = mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            const booksIDs = request.fields.data;

            let data = [];
            for (const iterator of booksIDs) {
                let basketItem = await collection.findOne({ "id_book": iterator })
                data.push(basketItem)
            }

            let result = {
                success: true,
                status: 200,
                data: data,
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