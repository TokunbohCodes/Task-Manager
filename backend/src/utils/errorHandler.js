export const errorHandler = (err, req, res, next) => {
   console.log("🔥 Error occurred:", err);

   const statusCode = err.statusCode || 500;
   const message = err.message || "Server Internal Error";
   return res.json({
      statusCode,
      message,
   })
};
