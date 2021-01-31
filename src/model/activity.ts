import { Model, Eloquent } from 'eloquents'
import { Activity as ActivityEntity } from '../entity/activity'
import User from './user'

class Activity extends Model {

    public static entity = ActivityEntity

    public static table = 'activities'

    protected fillable = [
        'user_id',
        'description',
    ]

    protected updatable = [
        'description',
    ]

    public user() {
        return this.belongsTo(User, 'user_id', 'id')
    }
}

export default Eloquent(Activity)