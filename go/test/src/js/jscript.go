package js

import (
	"fmt"
	"io/ioutil"

	"github.com/dop251/goja"
)

var vm *goja.Runtime

func init() {
	vm = goja.New()
	var lib = LoadFile("javascript/A2F371B04BA130CFC49519B7177B9087.js")
	var pri = LoadFile("javascript/test.js")
	_, err := vm.RunString(lib + pri)
	if err != nil {
		fmt.Println(err.Error())
	}
}

func GetEncrypt() func(data string) string {
	var en func(data string) string
	err := vm.ExportTo(vm.Get("MyEncrypt"), &en)
	if err != nil {
		fmt.Println("Js函数MyEncrypt映射到 Go 函数失败！\n" + err.Error())
		return nil
	}
	return en
}

func GetDecrypt() func(data string) string {
	var de func(data string) string
	err := vm.ExportTo(vm.Get("MyDecrypt"), &de)
	if err != nil {
		fmt.Println("Js函数MyDecrypt映射到 Go 函数失败！\n" + err.Error())
		return nil
	}
	return de
}

func LoadFile(path string) string {
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Printf("open file error\nfile name:%s\nerr:%s", path, err.Error())
		return ""
	}
	return string(bytes)
}
