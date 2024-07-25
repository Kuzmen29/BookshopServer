export function comment(settings) {
    const [
        app, mongoClient,
        NameOfDatabase, SettingsCollection, GeneralCollection] =
        [
            settings.app, settings.mongoClient,
            settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

    app.post("/BookshopAPI/comment", async (request, response) => {

        try {

            const collection = await mongoClient.db(NameOfDatabase).collection(GeneralCollection);

            let data = request.fields.data;

            await collection.updateOne({ id_book: data.bookID }, { "$push": { comments: data.comment } });

            let result = {
                success: true,
                status: 200, 
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