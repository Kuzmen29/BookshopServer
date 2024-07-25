export function user(settings) {
    const [
        app, mongoClient, uuidv4,
        NameOfDatabase, SettingsCollection, UsersCollection] =
        [
            settings.app, settings.mongoClient, settings.uuidv4,
            settings.NameOfDatabase, settings.SettingsCollection, settings.UsersCollection];

    app.post("/BookshopAPI/user", async (request, response) => {

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
            setTimeout(()=>response.status(200).send(result), 3000)
            //response.status(200).send(result)

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
    app.post("/BookshopAPI/user/nickname", async (request, response) => {

        try {

            const collection = await mongoClient.db(NameOfDatabase).collection(UsersCollection);

            let nickname = request.fields.nickname;

            let hasNickname = false;
            
            if (await collection.findOne( { "nickname": nickname } )) {
                hasNickname = true
            }

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
    app.put("/BookshopAPI/user", async (request, response) => {

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
                data: true
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