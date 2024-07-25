export function news(settings) {

    const [app, Nightmare] =
        [settings.app, settings.Nightmare];

    app.get("/BookshopAPI/news", async (request, response) => {

        try {

            let count = 0;

            const nightmare = new Nightmare();

            let [total, data] = await nightmare
                .goto('https://rg.ru/tema/kultura/literatura')
                .evaluate((count) => {

                    let array = Array.from(document.querySelectorAll('.PageRubricContent_listItem__rjCcF'))
                        .map((element) => {

                            let fullInfo = {};
                            fullInfo.href = element.querySelector('.ItemOfListStandard_imageLinkBox__wi4cV') && element.querySelector('.ItemOfListStandard_imageLinkBox__wi4cV').href;
                            fullInfo.poster = element.querySelector('.ItemOfListStandard_image___sWCo') && element.querySelector('.ItemOfListStandard_image___sWCo').src;
                            fullInfo.date = element.querySelector('.ItemOfListStandard_datetime__1tmwG') && element.querySelector('.ItemOfListStandard_datetime__1tmwG').innerText.replace("\n", "");
                            fullInfo.category = element.querySelector('.ItemOfListStandard_rubric__XePeA') && element.querySelector('.ItemOfListStandard_rubric__XePeA').innerText.replace("\n", "");
                            fullInfo.title = element.querySelector('.ItemOfListStandard_title__eX0Jw') && element.querySelector('.ItemOfListStandard_title__eX0Jw').innerText.replace("\n", "");
                            fullInfo.exclusive = element.querySelector('.ExclusiveTag_exclusiveLabel__GsekF') && element.querySelector('.ExclusiveTag_exclusiveLabel__GsekF').innerText.replace("\n", "");

                            return fullInfo;
                        })

                    return [
                        array.length,
                        array
                    ];
                }, count)
                .end()

            let result = {
                success: true,
                status: 200,
                data: data,
                total: total
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