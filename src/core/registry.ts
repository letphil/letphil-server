import appRegistry from './app.registry';

// ---------------- Services Import --------------------
import Users from '../services/users/users.controller';

// ------------- Services Registration -----------------
appRegistry.register('users', Users);

export default appRegistry;
