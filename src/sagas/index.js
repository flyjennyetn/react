/**
 * Created by flyjennyetn on 2016-10-26.
 */
import news from './news'
import check from './check'
import staticJson from './staticJson'

export default function* rootSaga() {
	yield* news()
	yield* check()
	yield* staticJson()

}