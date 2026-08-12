/* DuoGenesis · 前端 API 层（同源 fetch，本地 MVP 用）
 * 静态托管（GitHub Pages）下接口不可用，页面自动回退到演示数据。 */
(function () {
    'use strict';

    var TOKEN_KEY = 'duo_token';

    function req(method, path, body) {
        var headers = { 'Content-Type': 'application/json' };
        var token = localStorage.getItem(TOKEN_KEY);
        if (token) headers.Authorization = 'Bearer ' + token;
        return fetch(path, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) {
                if (!res.ok) {
                    var err = new Error(data.error || ('请求失败（HTTP ' + res.status + '）'));
                    err.status = res.status;
                    throw err;
                }
                return data;
            });
        });
    }

    function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }
    function setToken(t) {
        if (t) localStorage.setItem(TOKEN_KEY, t);
        else localStorage.removeItem(TOKEN_KEY);
    }

    window.DuoAPI = {
        token: getToken,
        setToken: setToken,
        me: function () { return req('GET', '/api/me'); },
        readEchoes: function () { return req('POST', '/api/me/read-echoes'); },
        echoes: function () { return req('GET', '/api/echoes'); },
        register: function (email, password, name) {
            return req('POST', '/api/register', { email: email, password: password, name: name });
        },
        login: function (email, password) {
            return req('POST', '/api/login', { email: email, password: password });
        },
        logout: function () {
            return req('POST', '/api/logout').catch(function () { return null; })
                .then(function () { setToken(''); });
        },
        posts: function () { return req('GET', '/api/posts'); },
        createPost: function (mood, text, isAgent) {
            return req('POST', '/api/posts', { mood: mood, text: text, is_agent: !!isAgent });
        },
        comments: function (postId) { return req('GET', '/api/posts/' + postId + '/comments'); },
        createComment: function (postId, text) {
            return req('POST', '/api/posts/' + postId + '/comments', { text: text });
        },
        addReaction: function (postId, type) {
            return req('POST', '/api/posts/' + postId + '/reactions', { type: type });
        },
        postReactions: function (postId) { return req('GET', '/api/posts/' + postId + '/reactions'); },
        items: function () { return req('GET', '/api/items'); },
        createItem: function (data) { return req('POST', '/api/items', data); },
        createOrder: function (itemId) {
            return req('POST', '/api/orders', { item_id: itemId });
        },
        payOrder: function (orderId) { return req('POST', '/api/orders/' + orderId + '/pay'); },
        myOrders: function (role) { return req('GET', '/api/orders?role=' + (role || 'buyer')); },
        adminStats: function () { return req('GET', '/api/admin/stats'); }
    };
})();
