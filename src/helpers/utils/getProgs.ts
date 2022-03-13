export const getProgs = (category: string, userid: number, programms: any) => {
  return (
    programms &&
    programms
      ?.filter(function (item: any) {
        return item[category]?.length > 0 ? true : false;
      })
      .map((item?: any) => {
        return item[category].map((prog?: any) => {
          prog.status = prog?.seller_id
            ? prog?.seller_id === userid
              ? "participate"
              : "busy"
            : "free";
          prog.ext = {
            person: item.name,
            id: item.id,
          };
          return prog;
        });
      })
  );
};
