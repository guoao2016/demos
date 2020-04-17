参考：http://gitbook.liuhui998.com/index.html



1. git reset 版本回退

    回退到上一版本
    git reset --hard HEAD^ 
    回退到指定版本
    git reset --hard (commit id)

2. git checkout 

    git checkout b(分支)
    

    场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
    未执行git add
    `
        git checkout -- file
    `

    场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作
    已经执行git add
    `
        git reset HEAD file
        git chekout --- file
    `

    场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。
    已经执行 git commit
    未执行   git push

    `
        git reset --hard (commit id)
        git push origin HEAD --force #远程提交回退
    `


3.  关联远程版本库
    ssh-keygen -t rsa -C "youremail@example.com"
    要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；

    关联后，使用命令git push -u origin master第一次推送master分支的所有内容；

    此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

 
    github  deploy keys
    ssh-keygen -t rsa -C "1044914567@qq.com"
    id_rsa.pub
ssh-keygen -t rsa -C "guo.ao@topsports.com.cn"

--- 报错refusing to merge unrelated histories
git pull origin master --allow-unrelated-histories
git push origin master:master


4. 删除分支
    git branch -d <branch name>删除本地分支，再通过git push origin :<branch name>


5. git stash

    查看
    git stash list 
    恢复 - 删除
    git stash apply 
    git stash drop

    恢复的同时把stash内容删除
    git stash pop
    
    指定
    git stash apply stash@{1} 
    清空队列
    git stash clea


6. git tag

    默认标签是打在最新提交的commit上的。
    git tag v1.0

    指定commit  git tag (v)  (commit id)
    git tag v0.9   f52c633

    还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：
    git tag -a v0.1  -m 'version 0.1 released'   f52c633


    删除标签

    git tag -d v0.1


    因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

    git push origint v1.0

    git push origin -tags

    删除远程
    git tag -d v0.9
    git push origin :refs/tags/v0.9
    
    
### git submodule
1. git status
    发现子模块有修改
    git submodule update --remote
2. [子模块修改，提交](https://segmentfault.com/a/1190000020297996)


有些时候你需要对submodule做一些修改，很常见的做法就是切到submodule的目录，然后做修改，然后commit和push。

这里的坑在于，默认git submodule update并不会将submodule切到任何branch，
所以，默认下submodule的HEAD是处于游离状态的(‘detached HEAD’ state)。

```
cd src/libs
-- 所以在修改前，记得一定要用 

git checkout master
-- 将当前的submodule分支切换到master，
-- 然后才能做修改和提交。
    git add .
    git commit - m ''
    git push
```



如果你不慎忘记切换到master分支，又做了提交，可以用cherry-pick命令挽救。具体做法如下：

    1. 用 git checkout master 将HEAD从游离状态切换到 master 分支, 这时候，git会报Warning说有一个提交没有在branch上，记住这个提交的change-id（假如change-id为 aaaa)
    2. 用 git cherry-pick aaaa 来将刚刚的提交作用在master分支上
    3. 用 git push 将更新提交到远程版本库中

2. 删除子仓库
    1. 删除.gitsubmodule里相关部分
    2. 删除.git/config 文件里相关字段
    3. 删除子仓库目录。

3. 日常操作
    . clone 父仓库的时候加上 --recursive，会自动初始化并更新仓库中的每一个子模块
        git clone --recursive https://gitee.com/xiaomumaozi/SubModule_Test.git
    . 父仓库执行git pull    
        git status
        如果发现submodule 有修改，执行

        git submodule update --remote
