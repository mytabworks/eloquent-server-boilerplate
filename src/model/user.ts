import { Model, Eloquent } from 'eloquents'
import { User as UserEntity } from '../entity/user'
import Activity from './activity'

class User extends Model {

    public static entity = UserEntity

    public static table = 'users'

    protected fillable = [
        'email',
        'name',
        'password',
        'roles',
        'profile_img',
        'token_version'
    ]

    protected updatable = [
        'email',
        'name',
        'password',
        'profile_img',
        'token_version'
    ]

    public activity() {
        return this.hasMany(Activity, 'user_id', 'id')
    }
}

export default Eloquent(User)