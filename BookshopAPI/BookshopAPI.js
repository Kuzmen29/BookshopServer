const NameOfDatabase = 'Bookshop';
const SettingsDatabase = 'Settings';
const GeneralCollection = "AllBooks";
const UsersCollection = 'Users';

import { books } from "./books.api.js";
import { book } from "./book.api.js";
import { search } from "./search.api.js";
import { basket } from "./basket.api.js";
import { user } from "./user.api.js";
import { news } from "./news.api.js";
import { comment } from "./comment.api.js";

// const options = {
//     key: fs.readFileSync("./agent2-key.pem"),
//     cert: fs.readFileSync("./agent2-cert.pem"),
// };

export function BookshopAPI (settings) {

    const [express, path, URL, app] = [settings.express, settings.path, settings.URL, settings.app];

    settings = { ...settings, NameOfDatabase, SettingsDatabase, GeneralCollection, UsersCollection};

    const __filename = URL.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use('/BookshopAPI/IMAGES/BOOKS', express.static(path.join(__dirname, 'data', 'images', 'books')));

    books(settings);
    book(settings);
    search(settings);
    basket(settings);
    user(settings);
    news(settings);
    comment(settings);
}