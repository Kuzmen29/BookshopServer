
export const GET = {

    getAllBooks: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.get("/BookshopAPI/GET/getAllBooks", async (request, response) => {

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

    getBook: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.get("/BookshopAPI/GET/getBook/:bookID", async (request, response) => {

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
    },

    getBooksByLetter: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.get("/BookshopAPI/GET/getBooksByLetter", async (request, response) => {

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
    },

    getBooksBySearch: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.get("/BookshopAPI/GET/getBooksBySearch", async (request, response) => {

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
    },

    getAllArtSecondhandLiterature: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, ArtSecondhandLiterature] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.ArtSecondhandLiterature];

        app.get("/BookshopAPI/GET/getAllArtSecondhandLiterature", async (request, response) => {

            try {

                console.log('work');

                const collection = await mongoClient.db(NameOfDatabase).collection(ArtSecondhandLiterature);
                let data = await collection.find().toArray();

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
    },

    getOneArtSecondhandLiterature: function (settings) {
        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, ArtSecondhandLiterature] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.ArtSecondhandLiterature];

        app.get("/BookshopAPI/GET/getOneArtSecondhandLiterature/:bookId", async (request, response) => {

            try {
                const collection = mongoClient.db(NameOfDatabase).collection(ArtSecondhandLiterature);

                const condition = { id_book: request.params.bookId };

                let data = await collection.findOne(condition);

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
    },
    getBooksFromBasket: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, GeneralCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.GeneralCollection];

        app.post("/BookshopAPI/GET/getBooksFromBasket", async (request, response) => {

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
    },
    getUser: function (settings) {

        const [
            app, mongoClient,
            NameOfDatabase, SettingsCollection, UsersCollection] =
            [
                settings.app, settings.mongoClient,
                settings.NameOfDatabase, settings.SettingsCollection, settings.UsersCollection];

        app.post("/BookshopAPI/GET/getUser", async (request, response) => {

            try {
                const collection = mongoClient.db(NameOfDatabase).collection(UsersCollection);

                const user = request.fields.user;

                let login = await collection.findOne({ nickname: user.nickname, password: user.password });

                let data = null;
                let success = false;
                if (login) {
                    data = {
                        id: login.id,
                        nickname: login.nickname,
                        email: login.email,
                        birthday: login.birthday,
                    }
                    success = true;
                } else {
                    console.log('No user!');
                }

                let result = {
                    success: success,
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
    },





    // app.post("/api/artSecondhandLiterature/updateOne", jsonParser, async (request, response) => {

    //     if (!request.body) return response.sendStatus(400);

    //     const condition = request.body.condition;

    //     const collection = request.app.locals.collection_artSecondhandLiterature;

    //     try {
    //         let data = await collection.updateOne(condition.firstArg, condition.secondArg);
    //         response.json(data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         response.sendStatus(500);
    //     }
    // });
    // app.post("/api/autho", jsonParser, async (request, response) => {

    //     if (!request.body) return response.sendStatus(400);

    //     const credentials = request.body.credentials;

    //     // console.log(atob(credentials))

    //     try {
    //         let data = "newToken";
    //         response.json(data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         response.sendStatus(500);
    //     }
    // });
    // app.get("/api/autho/:autho", jsonParser, async (request, response) => {

    //     if (!request.params.autho) return response.sendStatus(400);

    //     const autho = request.params.autho;

    //     try {
    //         let data = autho;
    //         response.json(data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         response.sendStatus(500);
    //     }
    // });
}