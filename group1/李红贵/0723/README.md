## GIT BASH操作

1. git clone  [路径] 拉取线上仓库 
2. cd [仓库名] 进入仓库

* 此时在你的仓库路径上会存在一个蓝色的(master);
* ls -a 查看所有的文件 
  此时会发现一个蓝色的.git 文件夹; => 本地仓库;

3. 因为更改了readme所以我们此时需要重新创建一个版本;

      工作区: 你看得见摸得着可以随意操作的代码;
      暂存区: 电话本,知道要把谁放入仓库，同时在暂存区之中会实时对比每次的代码的不同。 

      工作区 => 暂存区 

      git add -A

      指令执行没有任何提示,所以我们需要可视化的查看。

      git status 

      暂存区 => 本地仓库 会创建一个版本,这个版本可以用来回溯;

      git commit -m "注释";


4. 本地版本是本地的!
   
      如果想要将本地版本推送到线上,这个时候我们需要使用push指令;

      git push -u origin master 

      git 指令起始符 
          push 推送到线上仓库
               -u 全部推送 
                  origin 表示一个仓库名称
                        masert  表示主分支

      把主分支全部推送到线上仓库;

5. 如果本地操作不是最新的,我们要git pull 拉取线上仓库代码合并不同的内容然后重新创建版本然后提交。

6. 如果错误删除或者更新代码不要慌使用版本回溯功能帮你忙;

     git reflog => 显示所有的版本
     
     挑一个你想要回溯的版本;重置当前HEAD为指定commit，但保持暂存区和工作区不变
      git reset --keep [commit]

     回溯之后更新并重新提交到本地仓库;
     
7.  git checkout -b "fenzhiming" 创建并切换到分支
      git branch 查看分支

8.git checkout master 切换回主分支

9.git merge fenzhiming 将分支合并到主分支

我提交试试哈