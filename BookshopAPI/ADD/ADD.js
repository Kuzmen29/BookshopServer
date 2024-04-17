export const ADD = {

    AddCommentToBook: function (settings) {
        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.post("/BookshopAPI/ADD/AddCommentToBook", async (request, response) => {

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
    },
    AddNewUser: function (settings) {
        const [
            app, mongoClient, uuidv4, 
            NameOfDatabase, SettingsCollection, UsersCollection ] =
            [
                settings.app, settings.mongoClient, settings.uuidv4,
                settings.NameOfDatabase, settings.SettingsCollection, settings.UsersCollection];

        app.post("/BookshopAPI/ADD/AddNewUser", async (request, response) => {

            try {

                const collection = await mongoClient.db(NameOfDatabase).collection(UsersCollection);

                let user = request.fields.user;

                let newUser = {
                    id : uuidv4(),
                    registrationday : new Date(),
                    nickname : user.nickname,
                    email: user.email,
                    birthday : user.birthday,
                    password : user.password,
                }

                console.log(newUser);

                await collection.insertOne(newUser);

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
}