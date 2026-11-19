import os
import shutil


if __name__ == "__main__":
    if os.path.exists("./dist.zip"):
        os.remove("./dist.zip")
        print("清理旧包成功")

    # 打包时保留 dist 这一层目录
    shutil.make_archive("./dist", "zip", root_dir=".", base_dir="dist")
