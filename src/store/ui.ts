export enum UI_REDUCER_TYPES {
   THEME = 'C_THEME',
   NAV = 'C_NAV',
}

export enum UI_REDUCER_DATA {
   LIGHT = 'LIGHT_THEME',
   DARK = 'DARK_THEME',
   PROFILE = 'NAV_PROFILE',
   MESSAGE = 'NAV_MESSAGE',
   GROUP = 'NAV_GROUP',
   CONTACTS = 'NAV_CONTACTS',
   SETTINGS = 'NAV_SETTINGS'
}

//----------------------------------- TYPES

type UIActionsType = {
   type: UI_REDUCER_TYPES,
   data: UI_REDUCER_DATA
}

type UIStateType = {
   theme: UI_REDUCER_DATA,
   activeNav: UI_REDUCER_DATA
}

//----------------------------------- STATE

const initState: UIStateType = {
   theme: UI_REDUCER_DATA.LIGHT,
   activeNav: UI_REDUCER_DATA.MESSAGE
}

//----------------------------------- REDUCER

const reducer = (state: UIStateType = initState, action: UIActionsType) => {
   switch(action.type) {
      case UI_REDUCER_TYPES.THEME: return { ...state, theme: action.data }
      case UI_REDUCER_TYPES.NAV: return { ...state, activeNav: action.data }
      default: return state
   }
}


export default reducer;
