export function book(settings) {

    const [
        app, mongoClient,
        NameOfDatabase, SettingsCollection, GeneralCollection] =
        [
            settings.app, settings.mongoClient,
            settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

    app.get("/BookshopAPI/book/:bookID", async (request, response) => {

        let bookID = request.params.bookID;

        try {

            const collection = await mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            let data = await collection.findOne({ "id_book": bookID });

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