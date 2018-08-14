## ajax

* common sample
```typescript
export interface User {
    id?: string;
    name?: string;
    surname?: string;
}

const existUser: User = {
    id: "1",
    name: "Roger",
    surname: "Gol D."
};
```

* fetch

```typescript
import {expect} from "chai";
import {Ajax, AjaxMethod, ContentType, AjaxResponse, AjaxError} from "wasabi-common/lib/util/ajax";
Ajax.fetch(AjaxMethod.GET, "file", {
        contentType: ContentType.json,
        queries: {
           file: "data/textfile.txt"
        }
    }).then((response: AjaxResponse) => {
      expect(response).exist;
      done();
   }).catch((response: AjaxError) => {
     done(response);
   });
```

* upload

```typescript
Ajax.upload("file", {
            data: {
                files: []
            }
        }).then((response: AjaxResponse) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* get

```typescript
Ajax.get("users").then((response: any) => {
            return response;
        }).then((response: AjaxResponse<User[]>) => {
            expect(response.data).to.be.exist;
            expect(response.data.length).to.be.eq(1);
            return Ajax.get(`users/${existUser.id}`);
        }).then((response: AjaxResponse<User>) => {
            const user = response.data;
            expect(user).to.be.exist;
            expect(user.id).to.be.eq(existUser.id);
            expect(user.name).to.be.eq(existUser.name);
            expect(user.surname).to.be.eq(existUser.surname);
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* post

```typescript
const data: User = {
            name: "This is name",
            surname: "This is surname"
        };
        Ajax.post("users", {data}).then((response: AjaxResponse<User>) => {
            const responseData = response.data;
            expect(responseData.name).to.be.eq(data.name);
            expect(responseData.surname).to.be.eq(data.surname);
            return Ajax.delete(`users/${responseData.id}`);
        }).then((response: any) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* put

```typescript
let user: User = null;
        const expectedUser: User = {
            name: "Test Update Name",
            surname: "Test Update Surname"
        };
        Ajax
            .get(`users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                user = response.data;
                return Ajax.put(`users/${user.id}`, {
                    data: {...user, ...expectedUser}
                });
            }).then((response: AjaxResponse<User>) => {
            const updatedUser = response.data;
            expect(updatedUser.id).to.be.eq(user.id);
            expect(updatedUser.name).to.be.eq(expectedUser.name);
            expect(updatedUser.surname).to.be.eq(expectedUser.surname);
            return Ajax.fetch(AjaxMethod.PUT, `users/${user.id}`, {
                data: user
            });
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* delete

```typescript
let data: User = null;
        Ajax
            .get(`users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                data = response.data;
                return Ajax.delete(`users/${data.id}`);
            }).then((response: AjaxResponse<User>) => {
            return Ajax.get(`users/${data.id}`).then((response: AjaxResponse) => {
                throw new Error(`${data.id} data could not deleted !`);
            }).catch((response: AjaxError) => {
                if (response.isAjaxError) {
                    if (response.status === 404) {
                        return response;
                    }
                }
                throw response;
            });
        }).then((response: AjaxResponse<User>) => {
            return Ajax.post(`users`, {data});
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* patch

```typescript
let user: User = null;
        const expectedUser: User = {
            surname: "Test Update Surname"
        };
        Ajax
            .get(`users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                user = response.data;
                return Ajax.patch(`users/${existUser.id}`, {
                    data: {...user, ...expectedUser}
                });
            }).then((response: AjaxResponse<User>) => {
            const updatedUser = response.data;
            expect(updatedUser.id).to.be.eq(existUser.id);
            expect(updatedUser.name).to.be.eq(existUser.name);
            expect(updatedUser.surname).to.be.eq(expectedUser.surname);
            return Ajax.patch(`users/${existUser.id}`, {
                data: {
                    surname: existUser.surname
                }
            });
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* upload

```typescript
const blob = new Blob(["This is my blob content"], {type : "text/plain"});
Ajax.upload("upload", {
    data: {
        files: [
            new File([blob], "name")
        ]
    }
}).then((response: AjaxResponse) => {
    done();
}).catch((response: AjaxError) => {
    done(response);
});
```

* head

```typescript
 Ajax.head("users").then((response: any) => {
            return response;
        }).then((response: AjaxResponse<User[]>) => {
            expect(response.responseType).to.be.eq("application/json");
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* options

```typescript
 const expectedAllowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
        Ajax.options("users").then((response: AjaxResponse) => {
            expect(response.allowedMethods).to.be.eq(expectedAllowedMethods);
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* Usage [Assertions](https://wasabi-io.github.io/wasabi-common/modules/_util_assertions_.html)

```typescript
import {expect} from "chai";
import {Ajax, AjaxError, AjaxMethod, AjaxResponse, ContentType} from "wasabi-common/lib/util/ajax";

export interface User {
    id?: string;
    name?: string;
    surname?: string;
}

const existUser: User = {
    id: "1",
    name: "Roger",
    surname: "Gol D."
};

/* tslint:disable no-unused-expression */
describe("util/Ajax", () => {
    it("fetch (get file)", ((done: MochaDone) => {

    }));


});

```


* fetch download file

```typescript
 Ajax.fetch(AjaxMethod.GET, "file", {
            contentType: ContentType.json,
            queries: {
                file: "data/textfile.txt"
            }
        }).then((response: AjaxResponse) => {
            expect(response).exist;
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch upload

```typescript
Ajax.fetch(AjaxMethod.POST, "file", {
            contentType: ContentType.multipart,
            data: {
                files: []
            }
        }).then((response: AjaxResponse) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch get

```typescript
Ajax.fetch(AjaxMethod.GET, "users").then((response: any) => {
            return response;
        }).then((response: AjaxResponse<User[]>) => {
            expect(response.data).to.be.exist;
            expect(response.data.length).to.be.eq(1);
            return Ajax.fetch(AjaxMethod.GET, `users/${existUser.id}`);
        }).then((response: AjaxResponse<User>) => {
            const user = response.data;
            expect(user).to.be.exist;
            expect(user.id).to.be.eq(existUser.id);
            expect(user.name).to.be.eq(existUser.name);
            expect(user.surname).to.be.eq(existUser.surname);
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch post

```typescript
   const data: User = {
            name: "This is name",
            surname: "This is surname"
        };
        Ajax.fetch(AjaxMethod.POST, "users", {data}).then((response: AjaxResponse<User>) => {
            const responseData = response.data;
            expect(responseData.name).to.be.eq(data.name);
            expect(responseData.surname).to.be.eq(data.surname);
            return Ajax.fetch(AjaxMethod.DELETE, `users/${responseData.id}`);
        }).then((response: any) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch put

```typescript
let user: User = null;
        const expectedUser: User = {
            name: "Test Update Name",
            surname: "Test Update Surname"
        };
        Ajax
            .fetch(AjaxMethod.GET, `users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                user = response.data;
                return Ajax.fetch(AjaxMethod.PUT, `users/${user.id}`, {
                    data: {...user, ...expectedUser}
                });
            }).then((response: AjaxResponse<User>) => {
            const updatedUser = response.data;
            expect(updatedUser.id).to.be.eq(user.id);
            expect(updatedUser.name).to.be.eq(expectedUser.name);
            expect(updatedUser.surname).to.be.eq(expectedUser.surname);
            return Ajax.fetch(AjaxMethod.PUT, `users/${user.id}`, {
                data: user
            });
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch delete

```typescript
let data: User = null;
        Ajax
            .fetch(AjaxMethod.GET, `users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                data = response.data;
                return Ajax.fetch(AjaxMethod.DELETE, `users/${data.id}`);
            }).then((response: AjaxResponse<User>) => {
            return Ajax.fetch(AjaxMethod.GET, `users/${data.id}`).then((response: AjaxResponse) => {
                throw new Error(`${data.id} data could not deleted !`);
            }).catch((response: AjaxError) => {
                if (response.isAjaxError) {
                    if (response.status === 404) {
                        return response;
                    }
                }
                throw response;
            });
        }).then((response: AjaxResponse<User>) => {
            return Ajax.fetch(AjaxMethod.POST, `users`, {data});
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```

* fetch patch

```typescript
let user: User = null;
        const expectedUser: User = {
            surname: "Test Update Surname"
        };
        Ajax
            .fetch(AjaxMethod.GET, `users/${existUser.id}`)
            .then((response: AjaxResponse<User>) => {
                user = response.data;
                return Ajax.fetch(AjaxMethod.PATCH, `users/${existUser.id}`, {
                    data: {...user, ...expectedUser}
                });
            }).then((response: AjaxResponse<User>) => {
            const updatedUser = response.data;
            expect(updatedUser.id).to.be.eq(existUser.id);
            expect(updatedUser.name).to.be.eq(existUser.name);
            expect(updatedUser.surname).to.be.eq(expectedUser.surname);
            return Ajax.fetch(AjaxMethod.PATCH, `users/${existUser.id}`, {
                data: {
                    surname: existUser.surname
                }
            });
        }).then((response: AjaxResponse<User>) => {
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* fetch head

```typescript
Ajax.fetch(AjaxMethod.HEAD, "users").then((response: any) => {
            return response;
        }).then((response: AjaxResponse<User[]>) => {
            expect(response.responseType).to.be.eq("application/json");
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```


* fetch options

```typescript
const expectedAllowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
        Ajax.fetch(AjaxMethod.OPTIONS, "users").then((response: AjaxResponse) => {
            expect(response.allowedMethods).to.be.eq(expectedAllowedMethods);
            done();
        }).catch((response: AjaxError) => {
            done(response);
        });
```
 

