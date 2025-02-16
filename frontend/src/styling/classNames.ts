// GRIDS

export const flexRowMP2 = `flex flex-row justify-center m-2 p-2`;

export const flexRowSimple = `flex flex-row justify-center`;

export const flexCol = `flex flex-col justify-center content-start flex-start`;

export const flexRowBordered = flexRowMP2 + ` border-solid border rounded-lg`;

// TEXT

export const sectionTitle = `font-bold text-blue-800 text-2xl mb-3`;

export const sectionSubTitle = `font-semibold text-gray-400 text-xl mb-2`;

export const sectionDetail = `text-gray-600 text-sm mb-1`;

// BUTTONS
const headerButtonShared =
  "m-2 px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75";
export const selectedHeaderButton = `${headerButtonShared} bg-zinc-500 text-white hover:bg-blue-700 focus:ring-blue-400`;
export const unselectedHeaderButton = `${headerButtonShared} bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400`;

const buttonShared = `text-white font-bold py-2 px-4 rounded-lg m-1 `;
export const primaryButton = buttonShared + `bg-green-500 hover:bg-green-700`;
export const secondaryButton = buttonShared + `bg-blue-500 hover:bg-blue-700`;
export const standardButton = buttonShared + `bg-gray-400 hover:bg-gray-600`;

export const microButton = `bg-slate-100 text-sm py-2 px-4 rounded-lg m-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 py-1 px-2`;

// OTHER
export const inputBox = `border border-gray-300 rounded-lg p-2 mx-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`;
