/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('data', ['firebase'])

.run(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoOYEtTFr_EN2Qiyd45Kheh4iGBg2c720",
    authDomain: "eeshares-49f6f.firebaseapp.com",
    databaseURL: "https://eeshares-49f6f.firebaseio.com",
    storageBucket: "eeshares-49f6f.appspot.com",
    messagingSenderId: "76398339872"
  };
  firebase.initializeApp(config);
})

.service('userService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
        var refDatabase = firebase.database().ref();
        var users = $firebaseArray(refDatabase.child('users'))
        var currentID = ''
        var data = {
            'users' : users, 
            addUser: function(id, name, email){
                console.log(name)
                return refDatabase.child('users').child(id).update({
                    'name': name,
                    'email': email, 
                    'icon': "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAH0AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisrVNct9NQqP3kxHCA9PrUTqRhHmk7IqEJTdoo0pZo4Iy8rhFHcmubv/FYRilnGGx/G/T8BXPX2pXGoTF5nOOyA8CqleRXzCUtKeiPUo4GMdamrNv/AISnUN+f3eMdNtdDo+uR6mDG4Ec4/hzw30rg6fDK8EySoSGU5BFY0cbVhK8ndGtXCU5RtFWZ6hRVXTr2PULJJ4+/DA9QatV78ZKSujxZJxdmFFFFMQUUUUAFFFFABRRRQAUUUUAFFFFAHB+Nf+QzD/17r/6E1FHjX/kMw/8AXuv/AKE1FAHeUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUjEKpYngUALRXG3/iq5ad1tNqRg4DEZJotfF1yhxcxJIPVeDXH9eo81rnV9Tq2udlRXPx+LbFjh45E98ZrSt9XsLofu7lM+hODW8a9OfwyMZUakd0XqKaskb/cdW+hzTq1MwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKa7rGhZ2CqOpNEjrFGzuwVVGSTXEa3rb38hhhYrbDt/ePrXPiMRGjG73N6FCVaVlsXtX8Tbt9vZdOVaQ9/pXMMzMxZiST3JpKK8CtXnVleTPapUY0laIUUUVkaBRRRQB0fhK6KXctsWOHXco7ZFdhXmVpctaXUc6dUOfrXolheJf2cdwgwGHI9DXtZdWTh7N7o8nHUmp862ZZooor0jgCiiigAooooAKKKKACiiigAooooA4Pxr/yGYf+vdf/AEJqKPGv/IZh/wCvdf8A0JqKAO8ooooAKKKKACiiigAooooAKKKKACiiigArO1u4+zaTO2cFhtH41o1zPi652xQWwP3jvP8ASsMTPkoyZth4c9VI5DvRSnrSV86tj3GFFFFMCSO4mhOY5XQ+zYq4mt6lHjF3Jx681n0VUZyjsyXCL3R0Vr4tuovluI1lHqODWzB4n0+UDezRsezCuEorphjasOtzCeEpS6WPUo5Y5ow8bhlPQg0+vNrHU7rT3BhkIXPKHoa6/TvElpekRyfuZT2Y8H8a9GhjIVNHozgq4WcNVqjaooorsOUKKKKACiiigAooooAKKKKACiiigAooooAKQkKCScAdSaWuV8SawwLWMDDGP3jA8/Ssa9aNGHNI1o0nVlyoqa7rrXjPa25AtweWH8f/ANasGiivnatWVWXNI92nTjTjyxCiipILeW5lEUKF3PYVmk3oi27asjrU0/Qrq+w+PLi/vMOv0rc0vw7FbAS3WJJeoXsK3gABgDAr0aGBvrU+48+tjbaU/vOB1bS20yZFL70cZVsYrPrudfsxd6Y5Ay8Z3r/WuGrmxVFUp2Wx0Yaq6kLvcK6zwhc5intieh3gVyda/hu48jV41J4kGyng58laLHioc1Jo7yiiivozwQooooAKKKKACiiigAooooAKKKKAOD8a/wDIZh/691/9Caijxr/yGYf+vdf/AEJqKAO8ooooAKKKKACiiigAooooAKKKKACiiigArhPEk/naw69owFrumYIjMegGa8zupfPu5pc53OTXm5lO0FHud+XxvNy7EBpKcelNrx47HqMKKKKoQUUUUAFFFFABRRRQB1Ph/X38xbO7fIPCOe3sa6yvKhweK7jw7q/22D7PM37+McE/xCvVwWKv+7n8jzcXh7fvI/M3aKKK9M88KKKKACiiigAooooAKKKKACiiqepX8enWbTPyeir6mplJRTk9hxi5OyKOvawLCDyYm/0hxx/sj1rh2YsxZiSSckmpLi4kurh5pTl2OTUVfO4nEOtO/Toe7h6CpRt1CiitLSdJl1Kb+7Cp+Z/6CsYQc3yxNZSUFzSIdP02fUZtkQwo+856Cu20/TbfTotsS5Y/ec9TU1taxWkCxQoFUfrU1ezh8LGkrvVnkV8TKq7LYKKKK6jmEZQylT0Iwa881K2NnqE0PYNkfSvRK5XxXa4liuQPvDa39K4sdT5qfN2OzBT5anL3ObqS3kMNxHIOqsDUdFeOnZ3PWavoeoxuJIlcdGANOrO0Kfz9HgbOSBtP4Vo19TTlzRUu585OPLJx7BRRRVkhRRRQAUUUUAFFFFABRRRQBwfjX/kMw/8AXuv/AKE1FHjX/kMw/wDXuv8A6E1FAHeUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBS1abyNLuJO+wgV5zXb+KZjHpOwf8ALRwK4ivDzKV6qj2R6+Ajam33Cm06rV7YtZpbs2cTRh+ex9K4oJtNnZJpNIp0UUUxBRRRQAUUUUAFFHWrc2nzW8CSuOG6j0p2bV0K6TsyqBU1tcSWlwk0TYdTkVFRWfM07ouyasz0nT72O/s0nTuPmHoatVwvh7UzY3oic/uZTg+x7Gu6HIyK+iwtdVqd+q3PDxFH2U7dAooorpOcKKKKACiiigAooooARmVELMQFAySa8/1rUm1G9JBPkpwg/rW54o1Py4xZRN8z8uR2HpXI142YYi79lHZbnq4GhZe0fyCiirenWEmoXQiTherN6CvNjFydkd8pKKuybSdKk1K4xysK/eb+ldzBBHbQrFEoVFGABTbW1is7dYYlwqj86mr28Ph1Sj5njYiu6r8gooorpOcKKKKACs7XLf7TpMy4yy/OPwrRprqHjZT0IxUzjzRcX1KhLlkpHmdFS3MRgupYj/A5H61FXzjVnY+gTurnY+EZt1jNCTyj5H0NdFXG+Epil/LF2dM/lXZV9DgZc1BeR4eLjy1mFFFFdZzBRRRQAUUUUAFFFFABRRRQBwfjX/kMw/8AXuv/AKE1FHjX/kMw/wDXuv8A6E1FAHeUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByvjCX/j2iz/eY/pXLVu+KpN+rBc8JGB+prCr5zGS5q8me7hY8tGJLbxGa5jjH8TAV1viOzSTSN4X54cYPt3rn9AiE2sQg/wAOW/Ku5miSeF4pBlHGCK6cHS5qUvM5sXU5asfI8yoq1qFlJYXjwuOhyp9RVWuJpp2Z2ppq6CiiikMKdHG8rhEUsx6AVZtLCa7YYUhO7Guis9PiththQlj1Y8k1tToyn6GNSsoepT0/SlgAknAaTsOwrdhsVnQiZcxkdPWp7ezC/NJyewq3Xp0qCijzalZyZ5/qmnPp12YzkxnlG9RVGvQdU09NRs2iPDjlG9DXAyxPDK0cgwynBFeXiqHspabM9LDV/ax13Qyu68Oaj9tsfLdsyxcH3HY1wtXtJvm0/UI5QfkJ2uPUUYSv7Kpd7MeJo+1p2W56LRSKwdAynIIyKWvozwgooooAKKKKACq97dpZWck7nhRx7nsKsVx3inUPNuFs0b5Y+W+tc+JrexpuXU2w9L2s1Ewrid7m4eaQ5Zzk1FRRXzbbbuz30rKyJIIXuJlijXLscAV3ul6dHp1osa4Lnl29TWb4c0oW8P2uUfvXHyg/wit+vXweH5I88t2eVi6/O+SOyCiiiu44gooooAKKKKACiiigDiPEkHk6s7AcSKG/p/Ssiun8WxDFvN35WuYrwcVHlqyR7eGlzUkzU8PSeXrUH+0dtd/XmlhL5OoW8n92QH9a9Lr08slenJeZwZhH30wooor0jgCiiigAooooAKKKKACiiigDg/Gv/IZh/wCvdf8A0JqKPGv/ACGYf+vdf/QmooA7yiiigAooooAKKKKACiiigAooooAKKKKAOA8QSeZrU59MD9Ky6u6s27Vro/7ZqlXy9Z3qSfmfRUlaml5HQ+E4g15NIR91MA11tc74TTFrO+OS4FdFXr4ONqKPIxbvVZla1pCajAXTi4QfKfX2NcRNby28jRyxsrL1BFemVXubSO4HIGfcUq+FVR8y0ZVDEumuV7HncVvLM22ONmP0rYs9FVfnuTk9kHT8a6Mae4OAVAqeKyROXO4/pWVPCWeprPF3WhTt7VnAVV2oO+K0YYEhGF69zUoGBgUV2xgonFKbkFFFFWSFcz4m03gXsS+0mP5101MliSaJ4pBlWGCKyrUlUg4s0o1HTmpI80oqzf2jWN5JA38J4PqKrV4Ek4uzPdTUldHb+Gb43Vh5LnLw8fh2rcrz7Q702WpxsThH+R/oa9BByM17+Bre0pWe6PFxlLkqXWzCiiiuw5QooooArX90tlYyzt/COPc9q84lkaaVpHOWY5JrpPFl7l47NTwPmb+lcxXhZhW56nItkexgaXLDme7CtTQ9O+33wLjMMfLe/tWYAWYADJJwK77SLEWGnpHj52+Zz71lhKPtJ67I0xVb2cNN2XgAoAAwBS0UV7Z4wUUUUAFFFFABRRRQAUUUUAY3iaIPpJbHKODXFV6Bq8fmaTcr/sZrz+vIx8bVE/I9XAu9NrzFU4YH0NenwuJIUcdGUGvL69J007tNtj/0zX+VbZW9ZIzzBaRZaooor2DywooooAKKKKACiiigAooooA4Pxr/yGYf+vdf/AEJqKPGv/IZh/wCvdf8A0JqKAO8ooooAKKKKACiiigAooooAKKKKACjtRSHoaAPNb5t9/O3q5/nVepbg5uZf98/zqKvlJayZ9JHRI7Pwum3Si395zW3WV4dGNGi9yT+tate9h1alH0PDru9WXqFFFFbGQUUUUAFFFFABRRRQAUUUUAc94osfMt1u0HzR8N9K5KvSpolngeJxlXBBrzq5ga2uZIW6oxFeTjqXLLnXU9TA1OaLg+hEDg5Feh6Ld/bdLikJ+YDa31FeeV03hG62zTWrHhhuUUsvq8lXl7lY2nzU79jraKKK948YKa7rHGzscKoyTTqyPEd19m0l1Bw0p2D+tRUmoQcn0Lpw55KK6nF31y15eyzt/G2R7Cq9FFfLtuTuz6FJJWRs+HLH7Vf+a4zHDz+Pau1rM0KzFppiZHzyfM1ade3haXs6a7s8bE1PaVH2QUUUV0nOFFFFABRRRQAUUUUAFFFFAEN2u+zmX1Q/yrzcjBIr0yQZicexrzV+JH+przMwWsWelgHpJDa9E0Zt2j2x/wBgV53XoOgnOi2/+7Syz+I/QeYfAvU0qKKK9s8kKKKKACiiigAooooAKKKKAOD8a/8AIZh/691/9Caijxr/AMhmH/r3X/0JqKAO8ooooAKKKKACiiigAooooAKKKKACkP3T9KWg9DQB5hP/AMfMv++f51HUt0Nt3MP9s/zqKvlJbs+kjsd34f8A+QLB9D/M1p1meHznRYPx/ma069+j/Dj6I8Kt/El6hRRRWpmFFFFABRRRQAUUUUAFFFFABXIeKbXy7xLgDiQYP1FdfWV4gthcaTIcZaPDj+v6Vz4qnz0mjfDT5KqZw1W9MuvsWowzk4UN830qpRXhxk4tSXQ9qUVJNM9QiljmjDxuGUjIINPrzKK7uIBiKZ0HoDUv9pXv/P1J/wB9V66zONtYnmPL5X0kekVx/i24L3cUAPyouSPc1jf2le/8/Mn/AH1UEs0k775XLt6k1hiccqtPkSsa4fBunPmbuMq3plqbzUYYccFst9ByaqV0vhO2zJNcEdBtBrjw8OeoonVXnyU3I6gAKAB0FLRRX0B4QUUUUAFFFFABRRRQAUUUUAFFFFACN9xvpXmsv+uf/eP869Kb7jfSvNZf9a/+8f515uYfZ+Z6OX/aGV6BoH/IFt/93+tef16FoQxo1sP9mpyz+I/QvMP4a9TRooor2zyAooooAKKKKACiiigAooooA4Pxr/yGYf8Ar3X/ANCaijxr/wAhmH/r3X/0JqKAO8ooooAKKKKACiiigAooooAKKKKACiiigDzbUl2alcr6SGqtX9aXZrFyP9vNUK+Wqq05LzPoqbvBPyO48ONnRox6Ej9a1qw/Cz7tMZf7rmtyvcw7vSj6Hi11arL1CiiitjIKKKKACiiigAooooAKKguby3s4988gQe/U1zGoeJpZSY7RfLT++ep/wrGrXhS+JmtKhOp8KOku9QtbFMzygHso5JrmdR8Sy3KNFbxiONhgluSRWG8jyuXdizHqSabXmVcbOekdEelSwcIay1YUUUVxnWFFFFABRRRQAVpaZrM+mgoqq8ROSp4P51m0VUJyg7xepMoRmrSR3ljrlnfAAP5cn9x+K0q8x6dK1rDX7uyIVj50X91jz+Br0aWP6VEcFXA9abO4oqhY6vaX4Ajfa/dG61fr0IyUleLPPlFxdmgoooqhBRRRQAUUUUAFFFFADJTiFz6Ka82c5kY+5r0S9fZYzt6Ia85615eYPWKPSwC0kwr0fSV26VbD/pmK84FemWSGOxgQ9RGo/Sqyxe9JhmD92KJ6KKK9k8oKKKKACiiigAooooAKKKKAOD8a/wDIZh/691/9Caijxr/yGYf+vdf/AEJqKAO8ooooAKKKKACiiigAooooAKKKKACiiigDhPEybNakP95Qax66TxfFtu4Jv7yFfyP/ANeubr5vFR5a0ke/hnelFnU+EpfkuIu+Q1dLXF+GZ/K1TZniRSK7SvSwUr0V5Hm4yNqr8wooorrOUKKKKACiiqGoarbach8xt0nZB1NTKSiryY4xcnZF13WNSzsFUdSa57UvEyR5ishvbvIeg+lYeoavc6ixEjbYuyL0qhXmV8c3pT08z0qOCS1qEs9xNcyGSaRnY9yaioorz229Wd6SWiCiiigAooooAKKKKACiiigAooooAKKKKAFVmRgykgjoRW9pviWaAiO7Blj6bv4h/jWBRV06s6bvFkVKUaitJHpFtdQXcYkgkDr7dqmrzi1u57KUSQSFW7+h+tdbpfiCG8xHPiKb9Gr1qGMjU0lozy62ElDWOqNqiiiuw5AooooAKKKKAM7XJfK0ec/3htFcFXXeKpttlFCD99sn8K5GvGx0r1bdj1sFG1O/ckgQyTxoOrMBXpwGAAK880WPzdYtl9HB/KvRK7Msj7spHPmD95IKKKK9Q84KKKKACiiigAooooAKKKKAOD8a/wDIZh/691/9Caijxr/yGYf+vdf/AEJqKAO8ooooAKKKKACiiigAooooAKKKKACiiigDn/FsW/T4pMco/wChrjK9D1uHz9IuFHULuH4V55XhZjG1W/dHsYCV6VuxYsJvs9/DLnAVxmvRgcgGvMa7/Rrr7XpcMhOWC7W+o4q8vnq4EY+GikX6KKK9M80KCQBknApkkqQxtJIwVFGSTXIavr8l2TDbEpB3PdqxrV40ldm1GjKq7I0NV8RrCWgsyGfoZOw+lcrJI8rl5GLMepJzTaK8WrXnVd5Hr0qMaStEKKKKyNQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACjpRRQBu6T4hktdsN0TJD0Dd1rrYZo7iISROGQ9CK81q/puqT6bLlDujP3kPQ13YfGOHuz1RxYjCKfvQ3O/oqrY38N/AJYWz6r3Bq1XrRakro8tpp2YUUU12CIzHoBmmI4/xRP5morEDxGvP1NYdT3k5ubyaYknexI+naoK+erT56jke9ShyQUTc8Kxb9VL44RCc129cz4QgxDcTn+Jgo/Cumr3MBHloLzPIxkr1n5BRRRXYcoUUUUAFFFFABRRRQAUUUUAcH41/wCQzD/17r/6E1FHjX/kMw/9e6/+hNRQB3lFFFABRRRQAUUUUAFFFFABRRRQAUUUUANkQSRsh6MMV5ncRGC5liOfkYjmvTq4XxNb+RqzOBxKA1eZmULwU+x35fO03HuY1dH4WvQk0lox4f5l+tc5UkEz28ySxnDIcivKo1PZzUj0qtP2kHE9KqOeeO2haWVgqKMkmq9pqMFzp4ut4VQPnz/Ca5DV9WfUZiqkrAp+VfX3NexWxMacOZa32PJo4eVSdnpbcXVtYl1GUqpKwDovr7msuiivFnOU3zSPYhCMFyxCiiipKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAsWV7NYziWFsHuOxFdzpupQ6lb70OHH3l7ivPqns7uWyuFmibBHUeorpw2JdJ2exzYjDqqrrc9HrI8Q3otdNZAf3kvyj6d6tWOpQ3tl9oDBQo+cH+GuO1jUDqF8zqT5S/Kg9q9DE11Gl7r3ODDUHKp7y2M+iipbWE3F1FEBkuwFeMld2R7Ddlc7vQLf7Po8IIwWG4/jWnTY0EcaoOigAU6vqacOSCj2PnJy5pOXcKKKKskKKKKACiiigAooooAKKKKAOD8a/8hmH/AK91/wDQmoo8a/8AIZh/691/9CaigDvKKKKACiiigAooooAKKKKACiiigAooooAK57xZa+ZZR3A6xtg/Q10NV763F1ZTQt0ZSKyr0/aU3E1oz5KikeaUUrKUYq3BBwaSvmD6AeJZFiaMOQjclc8GmUUUXAKKKKACiiigAooooAKKKKACiiigAooqa0t3u7qOBByxx+FCTbsgbSV2XdJ0aXUmLE7IVPLY6/StqfwrAYT5EriQDjdyDW5bW6WtukMYwqjFS17NPB04wtJXZ49TF1HK8XZHm09vJbTNFKpV1PIqKux8Saes9p9qRf3kfXHcVx1eZXoulPlPSoVVVhzBRRRWJsFFFFABRRRQAUUUUAFFFFABRRRQA9JpI0dEdlVxhgD1plFFFwsFbnhe287U/NI+WIZ/GsOu38L2Zt9M81hhpju/DtXXgafPWXlqc2LnyUn5m5RRRX0J4YUUUUAFFFFABRRRQAUUUUAFFFFAHB+Nf+QzD/17r/6E1FHjX/kMw/8AXuv/AKE1FAHeUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVzPiXVzGv2K3YhzzIwPQelbepXgsLCScjJAwB715zJI8sjSSMWdjkk152PxHJH2cd2d2Coc755bIbRRRXiHrhRRRQAUUUUAFFFIzBVLMQAOpNAC0VzepeNtJ092jV2uJB1EfT86yh8SbbdzYS4/3hW8cLWkrqJm60E7Nnc0Vh6V4s0rVWEcc3lzH/lnJwfw9a3KylCUHaSsXGSkroKKKKkYV0vhS0zJLdMPu/Kv9a5qu+0S2+zaTCuBuYbj+NdeChzVb9jkxk+WnbuaFFFFe0eQI6h0KsMgjBrzq+tjaXs0HOEYgZ7jtXo1ch4pg2XscwH+sXn6iuHHwvT5ux24GdpuPcwKKKK8g9UKKKq32oWum2zT3cyxoPXv9KEm3ZA3bctUV5/f/ABGYOVsLRSo/jlPX8BWenxE1cPl4bVl9ApH9a61gazV7GDxFNPc9QorkNI8e2V66xXqfZpCcBs5U/j2rrlYMoZSCDyCK56lKdN2krGsZxmrxYtFFFQUFFFFABRRRQAV33h+5FxpMQ3hmQbSAMYrga2fDl49tqSxA/u5flI/rXXgqvs6uuz0OXF0uenp0O6ooor6E8QKKKKACiiigAooooAKKKKACiiigDg/Gv/IZh/691/8AQmoo8a/8hmH/AK91/wDQmooA7yiiigAooooAKKKKACiiigAooooAKKKQkAEnoKAOY8WXoCR2YByfnY+3auUq9q14b7UpZc/Lnav0FUa+axNX2lVyPfw9P2dNIKKKKwNgooooAKKKKAAkAEnoK4HU7/UfGGvp4f0QnyyxDMDgNjqSfQV0niu+aw8O3MqHDsAin3Nct8JtdstE8Yh791jjuIjEJW6KxIxmvSy+gpfvJHHi6riuWJs6h8D9VtdMNxbahDcXKruaDYVz7A968skjeKRo5FKuhKsD2Ir7Dv8AVbHTtPkvbq6ijt0XcXLDGK+Sdau49Q1y/vIhtjnneRR7Ek167Vjzqcm9yiCVIIJBHQivQ/Bfil7h10y+fdJj91ITyfY153UlvPJbXEc8TFZI2DKR6isK9GNWHKzop1HCV0e90VW0+6F7p9vcgYEsYb8xVmvnWrOzPVTuSQJ5txGg/iYCvSI1CRqoGAABXBaLH5msWykZG7P5Cu/r1Mvj7spHmY+XvJBRRRXonAFYfiiHzNNWQf8ALNx+tblUdYj83Sbhe+3I/Csq8eanJGlGXLUTPP6KKK+fPeIrieO1tpJ5W2xxqWY+wrg9D0q7+JviySGS4aGyhXedv8KZxx7mtT4gXjW+grApIM8gU/Qc1i/DHxdbeE9fle+yLS5j8t2AzsOcg162X0Vb2jODGVH8KPQdc+CWk/2S7aTcXEd5GhK+Y25ZCOx44/CvCZY3hleKQYdGKsPQivpbWvil4a0/SZZ7XUI7u4Kny4ojkk9s+lfNdzO91dTXEn35XZ2+pOa9N2OGm5dSKu78C+I2SYaVdyEo5/csx6H0rhKkt5mt7iOZCQyMGGPasa1JVYOLOinNwldHvdFRWsvn2kUw/jQN+YqWvnGrHqhRRRQAUUUUAFSQStBOkqfeQgio6KE7aoGr6HpWn3YvrKO4Cldw6GrNc14Tvd9vJaMeUO5eexrpa+mw9T2lNSPn61P2dRxCiiitjIKKKKACiiigAooooAKKKKAOD8a/8hmH/r3X/wBCaijxr/yGYf8Ar3X/ANCaigDvKKKKACiiigAooooAKKKKACiiigArJ8Q3v2PS3CnDy/IP61rVxHie7+0an5SnKQjH4nr/AErlxlX2dJtbvQ6cLT9pVXZGHRRRXzp7gUUUUAFFFFABRRRQBy3j+Nn8MkrnCTKx+mCP615TXuWrWK6lpdxaN/y0XA9j2rxO5tpbO5kt5kKyRttINevl004OPVHDiovm5iMyOyhS7FR0BPAptFFeicgUUVo6Jpcur6rDaxjKlgXPoveplJRV2NJt2R6z4aiaLw5Yq3Xyga1abHGsUSxqMKowBTq+ak+aTZ68VZWNvwugbVSSPuxkj8xXZ1yfhNM3Vw/91APzP/1q6yvZwKtRPIxjvVYUUUV1nKFQ3SeZaTIOrIR+lTUHpSaurAnZ3PMiMEj0pKfKMTOP9o0yvm2fRI4z4iwM+j28w+7HLz+IrzOvctV0+PVdMns5OBIuAfQ9jXit9ZTafeSWs6FZEODnv717GX1E4cnVHBioNS5ivRRRXoHKFORS7qijJY4FNrp/BehtqeqLcyp/o1udxJHDN2FZ1JqEXJlQi5OyPT9PhNvp1vCeqRqp/KrNFFfNt3dz10rBRRRQAUUUUAFFFFAF/R7v7FqcUpOEJ2t9DXoleWV6Holz9q0mB+6jafqK9bLKu9N+p5uYU9po0KKKK9Y8wKKKKACiiigAooooAKKKKAOD8a/8hmH/AK91/wDQmoo8a/8AIZh/691/9CaigDvKKKKACiiigAooooAKKKKACiiigCK6mW3tZZmOAik15pLI00zyMcliSa7HxVdeTp6wKSDK3P0FcXXiZlUvNQXQ9bAU7Qcu4UUUV5x3hRRRQAUUUUAFFFFABXM+J/CcWtr9otysV4o+8ejj0NdNRV06kqcuaJMoqSszw2+0i/06QpdWskeO+Mg/Q1SAycCvfXjSRdsiKw9GGarDTLBX3izgDevlivQjmOnvROV4TszyDS/DupatKqwW7KhPMjjCj8a9S8P+HrbQbUpGd8z/AH5COv8A9atdVVRhQAPQUtc1fFzq6bI2pUIw16hRT44pJW2xozH0UZrVtvDl/OAXVYlP988/lWEKc5/CrlzqRh8TL3hL7119F/rXUVmaRpI0tZMy72fGeMVp17eGg4UlGW542Imp1HKOwUUUVuYhRRRQB5xeAC9nAGAHP86grqLzwu8ssksM65ZidrCsW60i+tCfMgYr/eXkV4NWhUi22j26VenJJJlGsTXvDVprsQ8z93cKPllA5+hrbIwcGisoTlB80XqbSipKzPINQ8G6xYOdtsbiPs8POfw61nR6JqkrlEsLgsOo8s17hRgeld0cxmlqjmeFjfRnmWj+Aby5dZNRIt4euwHLH/CvRbKyt9PtUtraMRxoMACrFFctbETq/EbU6UYbBRRRWJoFFFFABRRRQAUUUUAFdR4Ru8PNasRg/Ov9a5er+jXP2XVYJCQFLbTn0PFb4Wp7OrGRjiIc9Jo9EopFYMoZSCCMgjvS19KeAFFFFABRRRQAUUUUAFFFFAHB+Nf+QzD/ANe6/wDoTUUeNf8AkMw/9e6/+hNRQB3lFFFABRRRQAUUUUAFFFFABRRSM21Cx6AZoA4jxRc+fqvlgnES7fx71iVNdyme8mlJJ3OTk1DXy9afPUcu59DShyQUQooorM0CiiigAooooAKKKKACiiigAooq9pumTalLtj4Qfec9BTjFydoilJRV2VIYZJ5BHEjOx7AV0mn+FxgPeuf9xf6mtyx0630+ILCg3Y5Y9TSabdz3lqZbiyktHDsojkIJIBwG47HrXq0cDGOs9WeXWxspaQ0RNBaW9qm2GJUHsKmooruSS0RxNt6sKy9R8SaLpKFr7U7aHHUGQFvyHNeU/FL4iXsOoy6DpExgSLi4mX7zN/dB7CvH5JZJnLyuzserMck1SRpGnfVn03J8T/B8f/MXRv8AdRv8KgX4r+EGJH9osuO5iNfNFFOxXs0fUlv8RvCVy6omtQBm4AYMP5iuitry1vE32tzDOv8AejcMP0r45rQ0rXNT0S5WfTryWB1Oflbg/UdDSsJ0+x9e0EA9a5bwH4tXxd4fW6dVS7iOydF6bvUexrqaRk1Yz7zRbK9B3x7H/vJwa5fUdAubHLp+9i9QOR9RXVapZ3d5DClnftZOk6SO6oG3oDynPQEd6kvtRstOWI3twkKzSCJN/wDEx6CuerhadTyZ0UsTOn5o87orsNW8Px3IM1qAkvUr2auRkjeKRo5FKspwQa8itQlSdmerRrRqq6G0UUViahRRRQAUUUUAFFFFABRRRQAUdKKKAPRtIk8zR7RvSJR+QxV2sPwrP5mkmMkZjcjHt1/qa3K+moS5qUX5Hz9aPLUkvMKKKK2MgooooAKKKKACiiigDg/Gv/IZh/691/8AQmoo8a/8hmH/AK91/wDQmooA7yiiigAooooAKKKKACiiigAqpqcwg0y5kJ6RnH1PAq3WT4kkWPQ5wWwXKqvvyD/Ss60uWnJ+RpSjzTS8zgqKKK+XPoQooooAKKKKACiiigAooooAKKKUAkgDqaALenWEmoXQiTherN6Cu8traK0t1hhUKqj86p6Lp62FioI/ev8AM5/pUuoaauotalrm4h+zzLMBC+3eR2b1HtXtYSgqcbvdnj4qu6krLZBpdlPYW0kVxey3jtK7iSUAFQTkLwOg6VdoorrOUKKKKAPkvxYkyeLdVWfPmC5fOevXj9Kxq9N+Mnht9P8AEI1iGM/Zr0fOw6CQf4ivMqpHRF3QUUUUxhRRQAScDk0Ae1/AgN9m1g87d0f9a9iri/hh4dk8P+EIRcJsubk+dICORnoPyrtKhnPJ3YUySGKbb5kaPtO5dyg4PrT6KBFK0u7qe+vIZrB4IoWURTFwRMCOSB2wapa5o6XsJniXFwo7fxD0raoqKlONSPLIqnNwlzRPMiCpIIwR1FJW/wCJdOFvcC6jXCSn5vY1gV4FWm6c3Fnu06iqRUkFFFFQWFFFFABRRRQAUUUUAFFFFAHS+EJgtzcQkH5lDD8P/wBdddXDeF5NmsBcZ3IRXc172XyvQt2PGxqtVuFFFFdxxhRRRQAUUUUAFFFFAHB+Nf8AkMw/9e6/+hNRR41/5DMP/Xuv/oTUUAd5RRRQAUUUUAFFFFABRRRQAVgeLf8AkFx/9dh/I1v1k+JI1k0OclQShVl9uR/SsMSr0ZLyNsO7VY+pwVFFFfNHvhRRRQAUUUUAFFFFABRRRQAVo6JbfatViUj5VO4/hWdXQ+E0BvJ37qg/U1th481WKZlXly05M62ub8aeLofB2jC9kgaeSR/LjjBxk+5rpK5P4i+Hm8R+ELq3hXNzD++iGOpHb8ele+eGrX1E8CeN4vGmnzy/Z/s9xAwWSPdkc9CK62vmL4eeKf8AhEvEyvc7ltJv3VwMfd5649q+mYJ4rmBJoZFkicblZTkEU2OcbMkooopEmdrmi2fiDSJ9OvYw8Uo4OOVPYj0NfNHi/wAGaj4S1F4rhC9qx/c3Cj5WH9DX1RVa+sLTU7R7W9t454HGGSRcg00yoy5T47or3XWfgjp1zI8uk3r2pPIikG5Qfr1xWDD8C9WMwE2qWaxZ5KBif5U7mvOjyjrXrPwx+G8t5cQ65rERS2jIeCFxzIezH2rtvDXwn0LQZ0urgNf3SHKtKPlU+oWu9AAGAMAdhSuRKfRC9KKKKRmFFFcx448VweFPD8twXU3cgKW8eeS3r9BQCVzmNW+L9tpvit9KWwMttHIIpJg/O7OOB6V6YjiSNXX7rAEV8veCdFn8V+M4ElDOgk8+4f0AOf1NfUQAUAAYA4FNlzSWxS1e2F1pk0Z6gbh9RXn9emsAUYHkEV5rMuyeRf7rEfrXlZhHWMjvwEtHEZRRRXnHoBRRRQAUUUUAFFFFABRRRQBr+Gv+Q3F/ut/Ku8rhfDCFtZRh0VSTXdV7mW/wX6nj4/8Ai/IKKKK9A4gooooAKKKKACiiigDg/Gv/ACGYf+vdf/Qmoo8a/wDIZh/691/9CaigDvKKKKACiiigAooooAKKKKACquowi4064iIzuQ4+varVBGQQe9KS5k0xxdnc8sIwcUVe1e1Nnqc0WCFzuX6GqNfKyi4ycX0Po4yUopoKKKKQwooooAKKKKACiiigArf8KSBb6ZM/eT+RrAq7pVz9k1KGU/dzg/Q1rQlyVFJmVaPNTaPQaKAcjI6UV9AeEeI/FD4cSwzTa9o0LPE2XuYEGSh7sB6etc74H+Jd94VxZXatdadn7mfmj/3f8K+kCAQQRkGvO/Fvwn0vXme609hY3rcnaPkc+47fhTuaKStaR1Wg+KtG8SWom069jkP8UROHX6qea2q+YNW8C+KvC0/ni1mZE5FxaEsB78cirekfFTxTo5WOW4F3EvBS4XJx9etFg5L7H0pRXjlh8dYimNQ0dw/rBJkfrW7D8aPC8igyLeRt3BiB/rSsTyM9Gorh4vi14QkAzfvH/vxN/SnSfFjwgmcaiz/7sTf4UC5WdtRXnr/GXwomcPdv/uw//XrNufjjosbEW+nXcw7E4X+tFg5WeqUjOqKWdgqjqScAV4RqPxw1edXSw0+3t8/ddyXI/CuOvfE3inxTN5El3d3RfgQwg4P4CnYpU31Pa/FfxV0XQFkt7KRb++HASI5RT7t0/AV4lc3Wu+P/ABGuRJc3UpwiL92Nf6Cum8O/B7XNUZJtUK2FueSGOZCPp2/GvavDnhTSfC9oINPtwrkfPK3Lv9TRsO8Y7FDwN4MtvB+keUAr3s2Gnmx1PYD2FdVRRSM27jXYJGzE4AGTXm0rb5nb1Ymu61q6FrpcrZwzDav41wVeVmEryUT08BG0XIKKKK887wooooAKKKKACiiigAooooA6XwhBuubicn7ihQPr/wDqrrqyPDdt9n0dGPWU+Yfx6fyrXr6PBw5KMUeFip89VsKKKK6TnCiiigAooooAKKKKAOD8a/8AIZh/691/9Caijxr/AMhmH/r3X/0JqKAO8ooooAKKKKACiiigAooooAKKKKAOb8V2JkgS7RclPlbHpXIV6hLGs0TxuMqwIIrzvU7F9PvpIWB25yh9RXi5jQ5Ze0WzPWwNa8fZvoU6KKK807wooooAKKKKACiiigAooooA7fQNRF7ZCJz++iGD7jsa1685srySxuVmjPI6j1Fd9ZXkV9brNE2Qeo7g17OEr+0jyvdHkYqh7OXMtmWKKKK7DkEIBGCAR6GsbU/COgavuN7pdvIzcF9uG/MVtUUAeVeKvhP4ctdEu7+zFzBLCm5VEmV6+hH9a8gbQxj5J/zWvp3xTC0/hbUo0+8YSfy5/pXz1UTk1sfRZPhaOIpSdRXaZhHRJgCfNTj61Xi0+SWTYGUH3rpG+430rNsv+Pn8KIzbTPQnlWGUkkvxKo0ObvKn61s+HPCEWsa5a2E90yJM2CyLyKkrpfAUTS+MrHb/AAsWP0AqVOTYq+W4anRnNLVJ9Tu9P+EXhSx2mS3munHeaTj8hiuusNH03S49ljZQW6/9M0Aq9RWp8e22FFFFAgoorF13V1s4DBE2Z344/hFRUqRpxcpF04OcuVGN4j1AXV35EZzHFwT6msSgnJyetFeBUqOpJyZ7lOCpxUUFFFFQWFFFFABRRRQAUUUUAFX9Isjf6jHFtygO5/pVDrXdeHdN+xWIkdcTS8n2HYV04Sh7WpbojnxNb2VPzZrxRrDEkSDCIoVR6AU6iivo9jwgooooAKKKKACiiigAooooA4Pxr/yGYf8Ar3X/ANCaijxr/wAhmH/r3X/0JqKAO8ooooAKKKKACiiigAooooAKKKKACs3WdLTUrQgACZOUb+laVFTOCnFxlsyoTcJcyPL5YnhlaORSrqcEGmV3GuaGl/GZ4QFuQP8AvquJkjeJykilWU4IPavncRh5UZWex7lCvGrG63G0UUVzm4UUUUAFFFFABRRRQAVc07UZtOn3xHKn7ynoap0U4ycXdClFSVmeh2OowahCHibnup6irdebQXEtrKJIXKMO4rqNP8TRSgR3Y8t/746GvWoY2M9J6M8utg5R1hqjoaKbHIkqhkYMp7g06u44hskayxPG4yrAgj2rwDxToM+gazNA6nyXYtC+OCv/ANavoGs3WdDsddsjbXsQYdVcfeQ+oNTKN0ejluO+qVLv4XufOpGQRVaG0EMpfdn0Feiar8L9UtpGawljuos8AnawrLi8AeI5JAv2HZ/tMwArK0lofVxx2FmuZTX3nMV6t8MfDr20UmsXKFXlG2EEfw9zS+HvhjFaTJc6vKs7KciFPu59z3r0RVVFCqoVQMAAYAq4Qtqzxc0zWFSDo0Xe+7FooorQ+dCioZ7mG1jLzSKij1NcxqXiV5g0VmCiHjeeprGrXhSXvM1pUJ1H7qNTV9ciso2ihYPcHt2X61xskjzSNJIxZ2OSTTSSxJJJJ6k0leNXryqu72PXo0I0lZbhRRRWJsFFFFABRRRQAUUUUAFFFZt94k03RbhPtavOw+byYyMn6ntVU4OcuWI0m9lc7Xw3o5mkF5cJ+7U/IpHU+tdeWCjLEADua8N1D4x6tKgj06yt7RBwCQWOK5DUvF2v6sW+16pcMrdUVtq/kMV9DQpxow5YnLLLMRXlzVGkvvPpa81bTtPjL3d7BCuM/O4HFV9I8QadrvmnTZjPHEcNIFO3PoD3r5z8O6FqHi3WYrNJJGAA8yVyWEaV9I6NpFpoemQ2FnGFijGM92Pqfet02zkxmEpYZcvNeX5F+iiiqPOCiiigAooooAKKKKAOD8a/8hmH/r3X/wBCaijxr/yGYf8Ar3X/ANCaigDvKKKKACiiigAooooAKKKKACiiigAooooAKytX0SHUl3j5JwOGHf61q0VE6cakeWS0KhOUHzRPNLuynspjFPGVI6Hsar16Xd2cF7CY54wy/qK5PUvDE9sGktSZox/D/EK8XEYCdPWGqPWoYyM9J6MwKKVlZSQwII7GkrgO0KKKKACiiigAooooAKKKKALFvqNzp+ZIZmUDkjqD+Fa9l47tnwt5A8Z/vLyK58gEEHkGqMmnAkmNsexroo4iVPRMiVClU+NHp1rrWm3g/c3cROM4LYNXldWGVYEeoNeNNZzpzsJ/3aWO6vLY/u55oyPRiK7o43ujmllqfwSPZaK8jTX9Xj6X8/0L5qT/AISbWf8An+lq/rkOxn/ZlTuj1imvLHGMu6qPUnFeSPrmrSfevrg+281Axvbk/O8z57sTik8bFbIayyX2pHp954j0qy3CS7RmH8KfMawbjxsLiQw2URTPSR+v5VyCafK33iFq5BZxwHdyzeprmqY2UlZaHRDBUYb6suTXE1w5eaRnY92Oajoorgbb1ZulbYKKKKACiiigAooooAKKKKACgkAZNU7/AFK206EyTv8ARRyT+FcHrXiq71DMMG63g7gfeb6mt6OGnVemxtToyntsb2u+LYrQPbWLCSfoXHRf8TXBSyyTytJK7O7HJZjkmmUV7NGhCkrRO+nTjBaBWt4d8P3niTVo7CzXljl3I4Re5NRaLot7r+pR2NjEXlc8nso9SfSvozwl4Vs/CulLbQAPOwzNNjlz/hW8Vc4sfjo4eNl8T/q4vhLwva+FdHS0hCtOwDTzAcu3+HpW/RRWp8rOcpycpO7YUUUUEBRRRQAUUUUAFFFFAHB+Nf8AkMw/9e6/+hNRR41/5DMP/Xuv/oTUUAd5RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAU7zTLS9U+dCrN/eHB/OuC1a2Gnag0OyRYyMqzV6TVS/wBOttRgMVwgYdj3H0rhxmEdaN4aSOvC4n2Uvf1R5sGU9GB+lLU+saJPpM3d4T91x/WvIta8V6vpPiG7it7nMSsMI4yBxXh4elVqVHSkrNHttw5VOLumerUV5lY/FGZPl1CxVv8AbiOP0rqrTxtolzarO1yIlJwQ/wDCfQ1rPC1YbolST2Z0dFUrTV9OvgDbXsEueyuM/lV2sWmtGMKKKKQBRRRQAUhAPUUtFADTGh6op/Ck8qP+4v5U+ii4xAoHQCloooEFFFFABRRRQAUUVHJNFCu6WVEHqzAUDJKKzRrunPcJBHcrLKxwFj5rZlt02fuZlL/7XSt4YarPaJMnyfEQU15EjUs7qqjuTioZtI1CfBXVI4h6Kn9aZb+FLXzPMvrx7o+jNgV0Ry+b+JlxdO15S/Ap3PiKwt8hHMrf7HT86w7zxNdT5WACFT3HJrpLnwXp88ryR3LRBuijBArjNU02TS757Z2Dgchx0IrVYWNN7Hp4SOEnpHV+ZWkleZy8jlmPcmoyit1UH60tFdGx6NiBrSFv4cfSoW09Sflcj61doqlJolwi+h6V4H8ReE/DtgtuFliuXH764kTO4/h2r0Kx8SaNqQH2XUrZ2PRPMAb8jzXznXRaL4M1vWirwWzQwn/lrL8o/D1rWNWW1jw8ZlOGd6s6jj6nvwIIBByD0NLXI+F/CmpaOI2vdZnlVBhbdG+QDt1rrq6E21qfL1oQhPlhLmXcKKKKZkFFFFABRRRQAUUUUAcH41/5DMP/AF7r/wChNRR41/5DMP8A17r/AOhNRQB3lFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQ3NpBdxmO4iSRfRhmvCPif8AC+9gu59c0hTcWzcywgfNH7j1Fe+0EAjB6VDpw5ua2vc1p1pw0T0PiBlwSrDkdQa6LwXYwX2ryW1xGskLRElG5GfX617J8R/hPDrCSaroMSRX45kgUYWX6ehryrwRbT2fiqa2uYmimjjZXRhgg1yY1uNCbXY9TDThUkrEuseDtS0x2utEurgJ1MSSEMv0I61y58SeIIX8t9Wv1ZTgq0zZH617hWDrnhTTtaQu6CK4A4lQYP4+tePhc0Xw4hX8zuq4V7wZrabqM7adavJtkZokJLDknAq4L9T96LH0Nc7o+pWdzCLOGYGe3HlMh4JK8ZA/CtTGK82opQm76GsYxaINZ8W6fojwi6WXEucFRnGKksfFuiX6gxX8QY/wudprgviR96x+jVwIJByK9zCYOFahGbepx1KnJUa6H0jHcQyrujlRl65BpftEI/5ap/30K8T0XxNfJEdLfE0c48pC33kJ4HNZepWWp6TP5N35yEfdbccH6GlHAPncJSt28wlWVrxR9AGeEdZUH/AqUzRhcmRceua+cTdXDdZ5Tj1c11Wh3EzaYN00h+Y9WNVUy/kV+Y2wi+sVOTY9jW4hd1RZFLMcAA9atC1nY4ETflXlVney2t5Dcb2PluGxu9K9Cfxjpn2PzvOZnx/qyDnNKngoy+KVjoxWFqUmlTXNciuNcsbaV4pJcMhIb2NV38U6YnSRm+i1ws8pnuJZiMF2LY9Mmo6n6tA9COX07K9zsZfGdsqnyrWVz23ECs+TxhqM8ix21rDGWOBuJJrnqu2VndPdQMtvKV3qc7TjrWsKNNdCng6MVc0NXm8UWUSPd3HlI5wvlkD+VJb+HfEWr20cz3rNFIMjzJmIx9K6PxzEf7Pstx/jP8q2vD11aR6HZoZ4g4TBBYZ612xjCM3FJHnOclho1YpXbfQ4628A6tBIJUuYkkHRg5BFaK+F/EK/8xR//Ah67oEEZByKkiiknkEcalmPpVummc/9oVUtbfccIPDPiRjgam5PoJ3rm7i81a1neGa8vEkU4IaVh/WvoPT9MS0QO4DTEcn0+lUfEPhLTPEUR+0RhLjHyzoMMPr61MsO7e6xUM8iqlq0U490jyLTNL13VLJbqHU5VRiRhp3zxWrqejLY+Frh7l/tN3wTNJ8zDkcAnkCu103wjPo+nJaRSiYLk7jxnNVdc8OalqGkT2sEI8x8Y3NgdRTjSsvMqWZRqVlaSUb+mlzxmivQbL4UapKc3l3BAvovzE11OnfC/RLQq1y0t046hzhfyFSqUmd9XOMJT2lf0PG7e1uLuURW8LyueiouTXX6T8M9av8AD3WyziP9/lvyr2Ky02y02IR2drFAoGPkUAn8atVrGgup5GIz+pLSjG3rqzkdI+HWhaYoM0H22Xu0/I/756V1cUMUEYjhjSNBwFRQAKfRWyilseLVxFWs71JNhRRRTMQooooAKKKKACiiigAooooA4Pxr/wAhmH/r3X/0JqKPGv8AyGYf+vdf/QmooA7yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArmtZ8F6ZqeoNqiQrFqOzZ5q/wAQ9/WuloqKlONSDhLZlwnKElKO6PJbuzmsp2hnQqw/Wq5+6a9V1HS7bU7cxTIM/wALDqK871jSJ9KnZHBaM/dcDg18njcvnhnzLWPc+jwmOjXXK9JHz9ezSQa1dSwuySLO5VlOCPmNdfoXjw5W31cbh0E4HT6iuN1P/kK3n/Xd/wD0I1Vr6CphqdemlNHPGpKEro7X4hPBdR6fNbyq8bBiGU5HauCMbDtXceD9Gtdcsr2C7UnYVMbA8ofas3XvC93okhbma3PSRQePrWWFq06L+q31X49R1YOf7y25iaR/yGbL/rsn869pvbG21G2a3uolljPZh0PqK8f0lQdZssj/AJbJ/OvbjEOxrhzibVSDRthIe60eXa94FntN1xpuZoepj/iX/GoNDUpp21gQwcgg9q9UKMO1cjrsapqbbEAyoJwOpowmPnWXsp6+Z3YGgoV+aPYy6KeIyevFPEaj3rsue4oshAJ6CniInrxUwAHSilcpRL/h+G1OuWougpi3c7ume36162AMDAGK8Vq/bavfQyRD7ZOI1YZXecYrWlV5FZnm47ASxElKLtY63x7/AMeVp/10P8q4Ou48Yyre6ZYNbnzN7nG3ntXWeGPB9pLplrJe2UO4ICxaMZY1cqbqTdjmpY2GDwkXNdWUPAFlfX+jDztwiVyI3b+7x/XNejWtpFaR7I157nuakhhjgiWKJFRFGAoGAKfXZCHKrHymLxTxFRztZPoFFFFWcgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwfjX/kMw/9e6/+hNRR41/5DMP/AF7r/wChNRQB3lFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDdWkF5A0M8YdGGMGpqKTipKz2Gm07o+bfH3ws1LRtSnvtPBuNPlcvuP3o8nOD/jXC/2Dff3U/76r7KkjSWNo5FDIwwQRwa8v8V/DUjzL7RQT/E1sf8A2X/CsKkZxV4HtZfWw1R+zxLaffp8zzLwYRoq3QvDt8zbt289K6l9b06RCjkspGCCmQa5WSN4pGjkUq6nBUjBBpteNWwsKtR1Jbn1UMBSjGybsJe6PpP9pwX2nytEUlV3iK/KcHt6V139vWH99/8AvmuSooq4aNVJTbdgjl9GN7XOt/t6w/vv/wB81yuv65Y/2lne33B/D9aZXL+IP+QiP9wVeFwVOFS6uY4pfVKftae+2pr/ANuWP/PRv++amtNQgvpxBbb5JCCQoXk4Ga42ui8Ef8jVbf7r/wDoJrtrU406cprojghmteUkrIuPrFnG5R2dWHBBQgim/wBuWP8Az0b/AL5rttb8L2GtRkugiuP4ZUHP4+teaaz4cv8ARZD50ZeEn5ZVHB/wrmwtehiNNpdjSpmGJh0Vv68zs7TSrq9tYrmFVMUihlJbHFTr4f1B2CrGpJ4ADVu+ELaW90TTbeBC8jQrwO3FeqaJ4cg01RLMBLcnuRwv0rnofWa9Vxikop7ir5w6EE5Wu+hy/gXwTdacz3mqhfmUeXDnOPc16IAFGAMAUtFe/CChGyPlcViqmJqOpU3CiiirOYKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOD8a/8hmH/r3X/wBCaijxr/yGYf8Ar3X/ANCaigDvKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOP8XeBbTX43ubULb345DgcP7N/jXjGo6bdaVevaXkLRSp1BHUeor6XrnfFXhO18TWy7yI7lB8kmP0Nc1agpK8dz3srzeWHapVneH5f8A+f6K6S98EaxZaqLKSIbW5Wb+Aj61W1bwxe6TbieRkkizgsnauJ05LofWRxdCTSjJO+xiVLN4TTXNO+1QyGO7UlRn7rAdqirq/D3/IM/4Ga5MTWnRhzwdnczx0FOlZnkWoaZd6XcGG7haNuxI4PuDWv4I/5Gq2/3X/8AQTXqV/p1rqVuYLuFZEPTI5H0rkrXwuvh3xFBqC3C/YRlSZDgoSMD9accyhXoyhLSTT+Z8+8O4TTWx29W7PQLjXg1uka+SeHeRcqB9O5rV0Lw3LqO24uMpbHker/Su8t7aG0hWGBAiL0Arny/LZVGqlTSP5mWMzCNL3Ker/Iz9B8PWHh2wS1sowMKAXPVq1aKK+nSSVkeBKcpvmk7sKKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHB+Nf8AkMw/9e6/+hNRR41/5DMP/Xuv/oTUUAd5RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUARzQxzxlJFDKfWuK8W6BcvpFxFap5ocfLzjH1ruaQqGBBAIPY1MoqSsb4fESoTUo9D5yvfD2p6fCZp7YiMdWUg4/Ktfw9/yDP8AgZr0PxL4c1CUhtNlQ2rnE0DqMhe5Brm7fQ/IuhY2ETkHnnnBPrXh5nQcaXu90fWQzKOIo+81ffTp6ldEaRwiKWYnAAHJrrNK8Fw3EKyazCsg3Blt25AwcjNbOi+HYNMQSSYkuCOWI6fStury7LPZ/vKy16LseFjMxc7wpbdxFUKoVQABwAKWiivbPJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDg/Gv/IZh/wCvdf8A0JqKPGv/ACGYf+vdf/QmooA7yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACo0t4Y5GkSNVdvvEDrRRSaTHckooopiCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA4Pxr/yGYf+vdf/AEJqKKKAP//Z"
                })
            },
            getUser: function(id){
                return refDatabase.child('users').child(id).once('value')
            }, 
            addCampaign: function(userID, campaignID){
                var campaigns = $firebaseArray(refDatabase.child('users').child(userID).child('campaigns'))
                campaigns.$add({
                    campaignID: campaignID    
                })
            }, 
            getCampaignList: function(id){
                return $firebaseArray(refDatabase.child('users').child(id).child('campaigns'));
            }, 
            setIcon: function(id, image){
                return $firebaseArray(refDatabase.child('users').child(id).update({
                    'icon': image
                }))
            }, 
            checkUpdate: function(){
                return $firebaseObject(refDatabase.child('update'));
            }
        }
        return data

    }]
)


.service('campaignService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
        var refDatabase = firebase.database().ref();
        var campaigns = $firebaseArray(refDatabase.child('campaigns'))
        var data = {
            'campaigns' : campaigns, 
            addCampaign: function(name, goal, duration, description, key, buildingID, uID){
                console.log(name)
                return campaigns.$add({
                    'name': name,
                    'goal': goal, 
                    'duration': duration, 
                    'description': description, 
                    'key': key, 
                    'building': buildingID,
                    'active' : "inactive", 
                    'owner' : uid
                })
            },
            getCampaign: function(id){
                return refDatabase.child('campaigns').child(id).once('value')
            }, 
            addUser: function(campaignID, userID){
                var tasksFB = $firebaseObject(refDatabase.child('campaigns').child(campaignID).child('tasks'))
                tasksFB.$loaded().then(function(tasks){
                    var users = $firebaseArray(refDatabase.child('campaigns').child(campaignID).child('users'))
                    users.$add({
                        'userID': userID, 
                        'score': 0,
                        'daily': false, 
                        'tasks': tasks, 
                        'prizes': {
                            'tv': 0, 
                            'starbucks': 0,
                            'maryland': 0
                        }
                    })
                })
                
            }, 
            getUserInfo: function(id, uid){
                return $firebaseObject(refDatabase.child('campaigns').child(id).child("users").child(uid))
            },
            getUserList: function(id){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child('users'));
            }, 
            setDaily: function(id, uid, score){
                var userRef = refDatabase.child('campaigns').child(id).child("users").child(uid).update({
                    'score': score,
                    'daily': true

                })
            },
            addMessage: function(id, uid, date, message) {
                var messages = $firebaseArray(refDatabase.child('campaigns').child(id).child('messages'))
                messages.$add({
                    'date' : date, 
                    'id' : uid,
                    'message' : message
                })
                
            }, 
            getMessages: function(id){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child('messages'))
            }, 
            getTasks: function(id, uid){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child("users").child(uid).child('tasks'))
            }, 
            addTaskToCampaign: function(title, description, id, uid){
                var tasksCampaign = $firebaseArray(refDatabase.child('campaigns').child(id).child("tasks"))
                tasksCampaign.$add({
                    'title': title, 
                    'description' : description, 
                    'completed': false
                })
            },  
            addTask: function(title, description, id, uid){
                var tasks = $firebaseArray(refDatabase.child('campaigns').child(id).child("users").child(uid).child('tasks'))
                tasks.$add({
                    'title': title, 
                    'description' : description, 
                    'completed' : false
                })
            }, 
            updateTasks: function(id, uid, tasks){
                angular.forEach(tasks, function(task){
                    var taskRef = refDatabase.child('campaigns').child(id).child("users").child(uid).child("tasks").child(task.id).update({
                        'completed': task.completed
                    })
                })

            }, 
            getCampaignUser: function(id, uid){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child("users").child(uid))
            }, 
            savePrizes: function(id, uid, tv, umd, star){
                var prize = refDatabase.child('campaigns').child(id).child("users").child(uid).child('prizes').update({
                    'maryland' : umd, 
                    'starbucks' : star, 
                    'tv' : tv
                })
            }
            
        }
        return data

    }]
)


.service('buildingService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
    
    var refDatabase = firebase.database().ref();
    var refStorage = firebase.storage().ref();
    var buildings = $firebaseArray(refDatabase.child('buildings'));
    var imagesRef = refStorage.child('images');
    
    console.log(buildings);
    
    
    var data = {
        'buildings': buildings,
        addItem: function(title, address, owner, description, image){
            buildings.$add({
                'title' : title,
                'address' : address, 
                'owner' : owner, 
                'description' : description,
                'image' : image,
                'campaign' : "NA"
            });
        }, 
        addCampaign: function(buildingID, campaignID){
            var campaignRef = refDatabase.child('buildings').child(buildingID).update({
                'campaign' : campaignID
            })
        },
        getURL: function(imageName){
            var promise = imagesRef.child(imageName).getDownloadURL()
            return promise;
        }, 
        getBuilding: function(id){
            return refDatabase.child('buildings').child(id).once('value')
        }, 
        getBillingData: function(id){
            return $firebaseArray(refDatabase.child('buildings').child(id).child('pastbills'))
        }, 
        getCurrentBill: function(id){
            return $firebaseObject(refDatabase.child('buildings').child(id).child('monthlyBill'))
        }
        
    }
    return data;

}]);

