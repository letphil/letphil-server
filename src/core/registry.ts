import appRegistry from './app.registry';

// ---------------- Services Import --------------------
import Users from '../services/users/users.controller';
import Items from '../services/items/items.controller';

// ------------- Services Registration -----------------
appRegistry.register('users', Users);
appRegistry.register('items', Items);

export default appRegistry;
