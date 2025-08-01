using AntDesign.Extensions.Localization;
using AntDesign.ProLayout;
using Microsoft.AspNetCore.Components;
using System.Globalization;
using System.Net.Http.Json;

namespace OpenStreetMap.Layouts
{
    public partial class BasicLayout : LayoutComponentBase, IDisposable
    {
        private MenuDataItem[] _menuData;

        [Inject] private ReuseTabsService TabService { get; set; }

        protected override async Task OnInitializedAsync()
        {
            _menuData = new[] {
                new MenuDataItem
                {
                    Path = "/",
                    Name = "OpenStreetMap",
                    Key = "OpenStreetMap",
                    Icon = "smile",
                },
                new MenuDataItem
                {
                    Path = "/welcome2",
                    Name = "welcome 2",
                    Key = "welcome2",
                    Icon = "smile",
                },
            };
        }

        void Reload()
        {
            TabService.ReloadPage();
        }

        public void Dispose()
        {

        }

    }
}
