import appRegistry from './app.registry';

// ---------------- Services Import --------------------
import Cars from '../services/cars/cars.controller';
import Items from '../services/items/items.controller';
import Users from '../services/users/users.controller';

// ------------- Services Registration -----------------
appRegistry.register('cars', Cars);
appRegistry.register('items', Items);
appRegistry.register('users', Users);

export default appRegistry;
