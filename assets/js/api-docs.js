/* global SwaggerUIBundle */

window.onload = function () {
  const ui = SwaggerUIBundle({
    url: '/swagger.yml',
    dom_id: '#swagger-ui',
    deepLinking: true,
  });

  window.ui = ui;
};
