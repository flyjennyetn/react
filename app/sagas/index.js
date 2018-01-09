/**
 * Created by flyjennyetn on 2016-10-26.
 */
import news from './news'

export default function* rootSaga() {
	yield* news()

}