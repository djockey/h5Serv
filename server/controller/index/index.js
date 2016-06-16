export default {
    routes: [{
        path: '',
        method: 'get',
        handler: async function (next) {
            let query = this.query;
            this.body = this.app.render("server/page/index.jade", {
                title: "公司宝（股票代码：836204）"
            });
        }
    }]
};
