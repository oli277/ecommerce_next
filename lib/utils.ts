
export function getQueryParams(srchparams: {
  cat?: string;
  search?:string

}) {
  const cat = srchparams.cat|| "";
  const search = srchparams.search?.toLowerCase() || "";
  

  return {cat, search}
} 
