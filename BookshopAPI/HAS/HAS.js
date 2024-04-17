export const HAS = {

    hasNickname: function (settings) {
        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, UsersCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.UsersCollection];

        app.post("/BookshopAPI/HAS/hasNickname", async (request, response) => {

            try {

                const collection = await mongoClient.db(NameOfDatabase).collection(UsersCollection);

                let nickname = request.fields.nickname;
                console.log(nickname);

                let hasNickname = false;
                
                console.log(await collection.findOne( { "nickname": nickname } ));
                if (await collection.findOne( { "nickname": nickname } )) {
                    hasNickname = true
                }

                console.log(hasNickname);
                let result = {
                    success: true,
                    status: 200,
                    data : hasNickname
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
    },
}