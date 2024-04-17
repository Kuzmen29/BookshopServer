const NameOfDatabase = 'Bookshop';
const SettingsDatabase = 'Settings';
const GeneralCollection = "AllBooks";
const ArtSecondhandLiterature = 'ArtSecondhandLiterature';
const UsersCollection = 'Users';

import { GET } from "./GET/GET.js";
import { ADD } from "./ADD/ADD.js";
import { PARSER } from "./PARSER/PARSER.js";
import { HAS } from "./HAS/HAS.js";

// const options = {
//     key: fs.readFileSync("./agent2-key.pem"),
//     cert: fs.readFileSync("./agent2-cert.pem"),
// };

export function BookshopAPI (settings) {

    const [express, path, URL, app] = [settings.express, settings.path, settings.URL, settings.app];

    settings = { ...settings, NameOfDatabase, SettingsDatabase, GeneralCollection, UsersCollection};

    const __filename = URL.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use('/BookshopAPI/IMAGE/', express.static(path.join(__dirname, 'data', 'books')));

    PARSER.getLastNews(settings);

    ADD.AddCommentToBook(settings);
    ADD.AddNewUser(settings);

    HAS.hasNickname(settings);

    GET.getAllBooks(settings);
    GET.getBook(settings);
    GET.getBooksByLetter(settings);
    GET.getBooksBySearch(settings);
    GET.getAllArtSecondhandLiterature(settings);
    GET.getOneArtSecondhandLiterature(settings);
    GET.getBooksFromBasket(settings);

    GET.getUser(settings);
    
}