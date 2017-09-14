{% 
    assign sections = site.posts | where: "onHome", true 
%}

<a href="#menu" class="nav"><span>Menu</span></a>

<nav id="menu">
    <ul>
        <li><a href="#about" data-alt="Chris Wynia"><span>About</span></a></li>
        {% for section in sections %}
            <li><a href="#{{section.hook}}" data-alt="{{section.title}}"><span>{{section.hook}}</span></a></li>
        {% endfor %}
    </ul>
</nav>