// import ronin from "ronin"
// import * as models from "./ronin-schema"

// export default ronin({ models })

import ronin from "ronin"
import * as models from "./ronin-schema"

const { get, set, add } = ronin({ models })

export { get, set, add }
