export function books(settings) {

    const [
        app, mongoClient,
        NameOfDatabase, SettingsCollection, GeneralCollection] =
        [
            settings.app, settings.mongoClient,
            settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

    app.get("/BookshopAPI/books", async (request, response) => {

        let page = 1;
        if (request.query.page) {
            page = +request.query.page;
        }
        let limit = 5;
        if (request.query.limit) {
            limit = +request.query.limit;
        }
        let skip = (page - 1) * limit;

        try {

            const collection = await mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            let totalPages = await collection.count();

            let data = await collection.find().skip(skip).limit(limit).toArray();

            let result = {
                success: true,
                status: 200,
                data: data,
                total: totalPages
            }
            // setTimeout(()=> response.status(200).send(result), 3000)
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