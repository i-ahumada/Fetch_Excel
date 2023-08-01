// TODO: FILTERS

const inputId = document.getElementById('submitSpreadSheetId');

/**
 * @param {HTMLElement} table
 * @param {string} spreadsheetId 
*/
const getHorasData = async (spreadsheetId, table) => {
	try {
		const response =  await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?`)
		let unformattedData = (await response.text()).slice(47, -2);
		const data = await JSON.parse(unformattedData);
		console.log(data)
		// MAKE TABLE	
		table.innerHTML = '';
		let arrColIngores = [];
		// Headers
		/**
		 * @param {HTMLElement} table 
		*/
		const headers = (table) => {
			let colCounter = 0;
			const row = document.createElement("tr");
			data.table.cols.forEach((col) => {
				if(col.label !== '') {
					const header = document.createElement("th");
					header.innerText = col.label;
					row.appendChild(header);
				} else { 
					arrColIngores.push(colCounter);
				}
				colCounter++;
			});
			table.appendChild(row);
		}
		
		// Cells
		/**
		 * @param {HTMLElement} table 
		*/
		const cells = (table) => {
			data.table.rows.forEach((cells) => {
				const row = document.createElement("tr");
				let colCounter = 0;
				cells.c.forEach((cell) => {
					if (!arrColIngores.includes(colCounter)) {
						const dataCell = document.createElement("td");
						dataCell.innerText = cell?.v === undefined? '': cell.v;
						row.appendChild(dataCell);
					}
					colCounter++;
				})
				table.appendChild(row)
			})
		}
		
		
		headers(table);
		cells(table);
	}
	catch(err) {
		console.error(`ERROR: ${err}`);
	}
}

inputId.addEventListener('click', (e) => {
	e.preventDefault()
	const table = document.getElementById("tabla");
	const texInput = document.getElementById("spreadSheetId");
	const spreadSheetId = texInput.value;
	console.log(spreadSheetId)
	getHorasData(spreadSheetId, table);
});